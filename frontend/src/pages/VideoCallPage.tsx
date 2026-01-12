import { useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useAuth } from '../context/AuthContext';

const VideoCallPage = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const zpRef = useRef<any>(null);

  const isVideo = searchParams.get('type') !== 'voice';
  const role = searchParams.get('role') || 'patient';

  useEffect(() => {
    if (!roomId || !user || !videoContainerRef.current) return;

    const initCall = async () => {
      const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
      const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;
      
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        user._id,
        `${user.firstName} ${user.lastName}`
      );

      zpRef.current = ZegoUIKitPrebuilt.create(kitToken);
      
      zpRef.current.joinRoom({
        container: videoContainerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        turnOnCameraWhenJoining: isVideo,
        showMyCameraToggleButton: isVideo,
        onLeaveRoom: () => {
          navigate(role === 'doctor' ? '/doctor/appointments' : '/appointments');
        },
      });
    };

    const timeoutId = setTimeout(() => {
        initCall();
    }, 100);

    return () => {
        clearTimeout(timeoutId);
        if (zpRef.current) {
            zpRef.current.destroy();
        }
    };
  }, [roomId, user, isVideo, navigate, role]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div ref={videoContainerRef} className="w-full h-full" />
    </div>
  );
};

export default VideoCallPage;