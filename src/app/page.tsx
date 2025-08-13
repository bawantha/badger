
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Crosshair, Swords, RadioTower } from 'lucide-react';
import Image from 'next/image';
import { Logo } from '@/components/icons/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold">Badger</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/missions">Missions</Link>
              </Button>
              <Button asChild>
                <Link href="/battle">Launch App</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-24 md:py-32 lg:py-40">
          <div className="container text-center">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground mb-4">
              Mission-Driven Social Competition
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Gamify Your Grind
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              Complete missions. Challenge rivals in 1v1 battles. Climb the leaderboards. Welcome to the next level of real-world action.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/missions">
                  View Missions <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/battle">
                  Join a Battle <Swords className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 bg-secondary">
          <div className="container">
            <h2 className="text-3xl font-bold text-center font-headline">Core Features</h2>
            <div className="mx-auto mt-12 grid gap-8 md:grid-cols-3">
              <Card className="bg-background/50">
                <CardHeader>
                  <Crosshair className="h-8 w-8 text-primary" />
                  <CardTitle className="mt-4 font-headline">Dynamic Missions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Tackle an ever-changing feed of challenges. Filter by category, difficulty, and rewards to find your next objective.</p>
                </CardContent>
              </Card>
              <Card className="bg-background/50">
                <CardHeader>
                  <Swords className="h-8 w-8 text-primary" />
                  <CardTitle className="mt-4 font-headline">1v1 Live Battles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Go head-to-head in live-streamed duels. Compete for glory, badges, and bragging rights in real-time.</p>
                </CardContent>
              </Card>
              <Card className="bg-background/50">
                <CardHeader>
                  <RadioTower className="h-8 w-8 text-primary" />
                  <CardTitle className="mt-4 font-headline">Spectator Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Watch live battles, support your favorite competitors with reactions, and learn from the best in our stream hub.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container grid items-center justify-items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl font-bold font-headline">Prove Your Mettle</h2>
              <p className="text-muted-foreground">
                Document your achievements with photo or video proof. Our system, backed by AI moderation, ensures fair play and a safe community environment.
              </p>
              <Button asChild>
                <Link href="/missions/operation-sentinel">
                  View Example Mission
                </Link>
              </Button>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="Mission Submission Example"
              width={600}
              height={400}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              data-ai-hint="mission action"
            />
          </div>
        </section>

      </main>
      <footer className="py-6 md:px-8 md:py-0 bg-black">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Badger. The source code is not available.
          </p>
        </div>
      </footer>
    </div>
  );
}
