import React, { useState } from 'react';
import { FaPix, FaCopy, FaCheck } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import './PixDonation.scss';

const PixDonation: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  const pixKey = process.env.REACT_APP_PIX_KEY || 'camila.leite.oliveira@gmail.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="pix-donation">
      <motion.button
        className="pix-donation__trigger"
        onClick={() => setShowQR(!showQR)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPix /> Apoie com PIX
      </motion.button>

      <AnimatePresence>
        {showQR && (
          <motion.div
            className="pix-donation__modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="pix-donation__content">
              <button 
                className="pix-donation__close"
                onClick={() => setShowQR(false)}
              >
                ×
              </button>

              <h3>Apoie meu trabalho</h3>
              <p>Gostou do projeto? Considere fazer uma doação!</p>

              <div className="pix-donation__qr">
                {/* Aqui você pode adicionar um QR Code real */}
                <div className="pix-donation__qr-placeholder">
                  <FaPix size={80} />
                  <p>QR Code PIX</p>
                </div>
              </div>

              <div className="pix-donation__key">
                <input 
                  type="text" 
                  value={pixKey} 
                  readOnly 
                  className="pix-donation__key-input"
                />
                <button
                  className={`pix-donation__copy ${copied ? 'copied' : ''}`}
                  onClick={handleCopy}
                >
                  {copied ? <FaCheck /> : <FaCopy />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>

              <p className="pix-donation__thanks">
                Muito obrigada pelo apoio! 💜
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PixDonation;
