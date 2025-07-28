import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--sydneyblue);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .pgp-key {
    margin-top: 40px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--light-slate);
    word-break: break-all;
    line-height: 1.6;
    text-align: center;
  }

  .pgp-key a {
    color: var(--green);
    text-decoration: underline;
    word-break: break-word;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        I’m currently looking for new opportunities and my inbox is always open.
        Whether you have a question or just want to say hi, I’ll try my best to get back to you!
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        Say Hello
      </a>

      <div className="pgp-key">
        PGP Fingerprint:<br />
        <code>5857 8309 32A6 3C37 3BD1 E87D 60CE E662 45C5 A4E8</code><br />
        <a
          href="https://keys.openpgp.org/vks/v1/by-fingerprint/5857830932A63C373BD1E87D60CEE66245C5A4E8"
          target="_blank"
          rel="noopener noreferrer"
        ><br />
          View Public Key
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
