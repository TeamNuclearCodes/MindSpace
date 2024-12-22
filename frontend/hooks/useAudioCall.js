"use client";
import { useState, useEffect, useRef } from 'react';
import { AudioCallService } from '@/services/AudioCallService';

export const useAudioCall = (ws) => {
  const [callState, setCallState] = useState({
    status: 'idle',
    remoteUserId: null,
    localStream: null,
    remoteStream: null
  });

  const audioService = useRef(null);

  useEffect(() => {
    audioService.current = new AudioCallService(ws, setCallState);
    
    return () => {
      if (audioService.current) {
        audioService.current.endCall();
      }
    };
  }, [ws]);

  const startCall = async (userId) => {
    try {
      await audioService.current?.startCall(userId);
    } catch (err) {
      console.error('Failed to start call:', err);
    }
  };

  const endCall = () => {
    audioService.current?.endCall();
  };

  return {
    callState,
    startCall,
    endCall
  };
};