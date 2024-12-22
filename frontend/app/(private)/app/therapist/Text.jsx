import { useEffect, useRef, useState } from 'react';
import { createAudioMeter } from 'web-audio-peak-meter';

export default function AudioProcessor() {
  const [isActive, setIsActive] = useState(false);
  const [volume, setVolume] = useState(1);
  
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const meterNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const meterElementRef = useRef(null);

  useEffect(() => {
    // Cleanup audio context on unmount
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startAudio = async () => {
    try {
      // Create AudioContext and get microphone input
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      sourceNodeRef.current = audioContextRef.current.createMediaStreamSource(stream);

      // Create GainNode for volume control
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = volume;

      // Create MeterNode for peak metering
      meterNodeRef.current = createAudioMeter(audioContextRef.current);

      // Connect the nodes: source -> gain -> meter -> destination
      sourceNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(meterNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);

      // Attach meter visualization
      createAudioMeter(audioContextRef.current, meterElementRef.current, {
        fontSize: 12,
        borderSize: 2,
        backgroundColor: '#000',
        tickColor: '#fff',
        gradient: ['#f00', '#ff0', '#0f0'],
      });

      setIsActive(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopAudio = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      setIsActive(false);
    }
  };

  const handleVolumeChange = (newVolume) => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume;
      setVolume(newVolume);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg">
      <div
        ref={meterElementRef}
        className="w-full h-24 bg-black rounded-lg"
      />
      <div className="flex gap-4">
        <button
          onClick={isActive ? stopAudio : startAudio}
          className={`px-4 py-2 rounded-full font-medium ${
            isActive 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isActive ? 'Stop' : 'Start'}
        </button>
      </div>
      <div className="w-full max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Volume: {Math.round(volume * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-full"
          disabled={!isActive}
        />
      </div>
    </div>
  );
}
