'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { submitMission } from '../actions';
import { useToast } from "@/hooks/use-toast"


const initialState = {
  message: '',
  status: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit for Review
    </Button>
  );
}

export function MissionSubmissionForm() {
  const [state, formAction] = useFormState(submitMission, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Submission Successful",
        description: state.message,
      });
    } else if (state.status === 'flagged') {
       toast({
        variant: "destructive",
        title: "Submission Flagged",
        description: state.message,
      });
    } else if (state.status === 'error') {
       toast({
        variant: "destructive",
        title: "Submission Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="proof-file">Proof (Photo/Video)</Label>
        <Input id="proof-file" name="proof" type="file" required />
        <p className="text-sm text-muted-foreground mt-1">Upload the required proof for this mission.</p>
      </div>
      <div>
        <Label htmlFor="mission-notes">Mission Notes</Label>
        <Textarea
          id="mission-notes"
          name="notes"
          placeholder="Add any relevant notes, times, or comments about your submission..."
          rows={4}
          required
        />
      </div>
      <SubmitButton />

      {state.message && state.status !== 'success' && (
         <Alert variant={state.status === 'error' || state.status === 'flagged' ? 'destructive' : 'default'} className="mt-4">
            {state.status === 'error' && <AlertTriangle className="h-4 w-4" />}
            {state.status === 'flagged' && <AlertTriangle className="h-4 w-4" />}
            <AlertTitle>{state.status === 'error' ? 'Error' : 'Notification'}</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
         </Alert>
      )}
    </form>
  );
}
