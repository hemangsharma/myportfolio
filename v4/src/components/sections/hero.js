import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--sydneyblue);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--night);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .typewriter {
    font-size: var(--fz-lg);
    font-family: var(--font-mono);
    color: rgba(210, 210, 210, 1);
    white-space: nowrap;
    overflow: hidden;
    border-right: 2px solid rgba(210, 210, 210, 1);
    animation: blink-cursor 0.7s steps(1) infinite;
  }

  @keyframes blink-cursor {
    0%, 100% {
      border-color: rgba(210, 210, 210, 1);
    }
    50% {
      border-color: transparent;
    }
  }
`;

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const words = ['A DATA SCIENTIST', 'A DATA ANALYST', 'AN ENGINEER', 'A PROBLEM SOLVER']; // Words to display
  const pauseTime = 1000; // Pause time between typing and deleting

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[loopIndex % words.length];

      if (isDeleting) {
        setText((prevText) => currentWord.substring(0, prevText.length - 1));
        setTypingSpeed(50); // Speed up deletion
      } else {
        setText((prevText) => currentWord.substring(0, prevText.length + 1));
        setTypingSpeed(100); // Normal typing speed
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopIndex((prevIndex) => prevIndex + 1);
      }
    };

    const typingInterval = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingInterval);
  }, [text, isDeleting, loopIndex, typingSpeed, words]);

  return (
    <StyledHeroSection>
      <h1>Hi 👋🏻, I'm</h1>
      <h2 className="big-heading">Hemang Sharma</h2>
      <h4 > MSc Data Science | BTech CSE</h4>
      <p className="typewriter">{text}</p><br></br>
      <a
        className="email-link"
        href="https://sharmahemang.com/simple.sharmahemang.com"
        target="_blank"
        rel="noreferrer">
        Check out simplfied version
      </a>
    </StyledHeroSection>
  );
};

export default Hero;