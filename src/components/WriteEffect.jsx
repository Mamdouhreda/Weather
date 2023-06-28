import React, { useState, useEffect } from 'react';
import Typist from 'react-typist';

const WriteEffect = () => {
  const [typing, setTyping] = useState(true);

  const handleTypingComplete = () => {
    setTyping(false);
  };

  useEffect(() => {
    if (!typing) {
      setTimeout(() => setTyping(true), 1000);  // Delay for 1 second before retyping
    }
  }, [typing]);

  return typing ? (
    <Typist onTypingDone={handleTypingComplete}>
    <span>Temperature, wind speed</span>
    <Typist.Backspace count={10} delay={500} />
    <span>feels-like conditions</span>
    <Typist.Backspace count={10} delay={500} />
    <span>Stay updated with local time too</span>
    <Typist.Backspace count={6} delay={500} />
      </Typist>
  ) : (
    <span></span>
  );
};

export default WriteEffect;
