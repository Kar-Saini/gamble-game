import { LegacyRef, useEffect, useRef, useState } from "react";
import { BallManager } from "../classes/BallManager";
import Modal from "./Modal";

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [ballManager, setBallManager] = useState<BallManager>();
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const newBallManager = new BallManager(
        canvasRef.current,
        setModalMessage
      );
      setBallManager(newBallManager);
    }
  }, []);
  return (
    <div style={{ display: "flex", height: "screen" }}>
      <div>
        <canvas
          ref={canvasRef as LegacyRef<HTMLCanvasElement>}
          width="800"
          height="800"
        ></canvas>
      </div>
      <div>
        <button
          onClick={() => {
            ballManager?.addBall();
          }}
        >
          Add ball
        </button>
      </div>
      {modalMessage && (
        <Modal
          message={modalMessage}
          onClose={() => {
            setModalMessage(null);
          }}
        />
      )}
    </div>
  );
};

export default Game;
