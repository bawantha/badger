
'use server';

import { moderateMissionSubmission } from '@/ai/flows/mission-submission-moderation';
import { z } from 'zod';
import { SignJWT } from 'jose';
import { auth } from '@/lib/firebase-admin'; // Using admin SDK on server
import { headers } from 'next/headers';

const FormSchema = z.object({
  notes: z.string().min(1, { message: 'Notes cannot be empty.' }),
  proof: z.instanceof(File).refine(file => file.size > 0, 'Proof file is required.'),
});

type State = {
  message: string;
  status: 'success' | 'error' | 'flagged' | '';
};

export async function submitMission(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    notes: formData.get('notes'),
    proof: formData.get('proof'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.notes?.[0] || 'Invalid input.',
      status: 'error',
    };
  }
  
  const { notes, proof } = validatedFields.data;
  
  // In a real app, we would upload the file to a storage service (e.g., Firebase Storage)
  // and potentially use a vision model to describe the image/video for moderation.
  // For this demo, we will moderate the text notes only.
  
  try {
    const moderationResult = await moderateMissionSubmission({
      content: notes,
      contentType: proof.type.startsWith('image/') ? 'photo' : proof.type.startsWith('video/') ? 'video' : 'text',
    });

    if (moderationResult.flagged) {
      console.log(`Submission flagged. Reason: ${moderationResult.reason}`);
      // The submission would be saved to the database with a 'flagged' status for manual review.
      return {
        message: `Submission under review. It was flagged for: ${moderationResult.reason}`,
        status: 'flagged',
      };
    }

    // The submission would be saved to the database with a 'pending' or 'approved' status.
    console.log('Submission successful and passed moderation.');
    return {
      message: 'Mission accomplished! Your proof has been submitted for verification.',
      status: 'success',
    };
  } catch (error) {
    console.error('Error during mission submission:', error);
    return {
      message: 'A server error occurred. Please try again later.',
      status: 'error',
    };
  }
}

async function getUserIdFromToken() {
    const authorization = headers().get('Authorization');
    if (!authorization?.startsWith('Bearer ')) {
        return null;
    }
    const idToken = authorization.substring(7);

    if (!auth) {
        console.error('Firebase Admin SDK is not initialized. Cannot verify ID token.');
        return null;
    }

    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        return decodedToken.uid;
    } catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        return null;
    }
}


export async function tokenProvider() {
  const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const STREAM_SECRET_KEY = process.env.STREAM_SECRET_KEY;

  if (!STREAM_API_KEY || !STREAM_SECRET_KEY) {
    throw new Error('Stream API key or secret is missing');
  }

  const userId = await getUserIdFromToken();
  
  if (!userId) {
    throw new Error('User is not authenticated');
  }

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = await new SignJWT({ 'get_user_id': userId })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(issued)
    .setExpirationTime(exp)
    .setNotBefore(issued)
    .sign(new TextEncoder().encode(STREAM_SECRET_KEY));

  return token;
}
