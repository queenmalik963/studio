
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SeatUser, sendMessage } from '@/services/roomService';
import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SpinTheWheelProps {
  participants: SeatUser[];
  onGameEnd: () => void;
  isOwner: boolean;
  roomId: string;
}

export function SpinTheWheel({ participants, onGameEnd, isOwner, roomId }: SpinTheWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<SeatUser | null>(null);
  const [rotation, setRotation] = useState(0);

  const segmentAngle = 360 / participants.length;

  useEffect(() => {
    if (winner) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
      sendMessage(roomId, {
        type: 'system',
        text: `🎉 Congratulations to ${winner.name} for winning Spin the Wheel! 🎉`
      });
    }
  }, [winner, roomId]);
  

  const handleSpin = () => {
    if (spinning || participants.length === 0) return;

    setWinner(null);
    setSpinning(true);
    
    const randomSpins = Math.floor(Math.random() * 5) + 5; // 5 to 10 full spins
    const winnerIndex = Math.floor(Math.random() * participants.length);
    const stopAngle = (winnerIndex * segmentAngle) + (segmentAngle / 2);
    const finalRotation = (randomSpins * 360) + stopAngle;

    setRotation(finalRotation);

    setTimeout(() => {
      setWinner(participants[winnerIndex]);
      setSpinning(false);
    }, 6000); // Corresponds to the transition duration
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-900/50 to-indigo-900/50">
      <h2 className="text-2xl font-bold font-headline mb-4 text-yellow-300 drop-shadow-lg">Spin the Wheel!</h2>
      
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-yellow-400 shadow-2xl flex items-center justify-center overflow-hidden mb-6">
        <div 
          className="absolute w-full h-full rounded-full transition-transform duration-[6000ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {participants.map((p, i) => (
            <div
              key={p.id}
              className="absolute w-1/2 h-1/2 origin-bottom-right"
              style={{
                transform: `rotate(${i * segmentAngle}deg)`,
                clipPath: `polygon(0 0, 100% 0, 100% 100%)`,
              }}
            >
              <div 
                className={cn(
                  "absolute w-full h-full origin-bottom-right flex items-center justify-center text-white font-semibold text-xs",
                  i % 2 === 0 ? 'bg-primary/70' : 'bg-secondary/70'
                )}
                style={{ transform: `rotate(${segmentAngle / 2}deg) skewY(-${90 - segmentAngle}deg)`}}
              >
                  <span className="truncate max-w-[80%]" style={{transform: `skewY(${90-segmentAngle}deg) rotate(-${segmentAngle/2}deg) translateY(-50%)`}}>
                    {p.name}
                  </span>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute w-3 h-3 bg-white rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 border-2 border-black"></div>
        <div 
            className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-[16px] border-t-yellow-400 z-20"
            style={{filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))'}}
        ></div>
      </div>

      {winner && !spinning && (
        <div className="text-center my-4 animate-in fade-in zoom-in-95">
          <p className="text-lg">The winner is...</p>
          <p className="text-3xl font-bold text-yellow-300 flex items-center gap-2">
            <Crown className="text-yellow-400"/>
            {winner.name}
          </p>
        </div>
      )}

      {isOwner ? (
        <div className="flex gap-4">
          <Button onClick={handleSpin} disabled={spinning || participants.length < 2}>
            {spinning ? 'Spinning...' : 'Spin the Wheel'}
          </Button>
          <Button variant="ghost" onClick={onGameEnd} disabled={spinning}>End Game</Button>
        </div>
      ) : (
        <p className="text-muted-foreground">Waiting for the host to spin...</p>
      )}
       {participants.length < 2 && (
          <p className="text-red-400 text-xs mt-2">Need at least 2 people on seats to play.</p>
        )}
    </div>
  );
}
