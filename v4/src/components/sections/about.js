import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled, { keyframes } from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

// --- Styles for About section remain as before (shortened for brevity) ---
const StyledAboutSection = styled.section`
  max-width: 900px;
  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;
    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--sydneyblue);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: #CED4DA;

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--night);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--sydneyblue);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

// --- TechStackGrid starts here ---
const tools = [
  { name: 'Airflow', icon: 'https://img.shields.io/badge/Apache%20Airflow-017CEE?style=flat&logo=Apache%20Airflow&logoColor=white' },
  { name: 'Anaconda', icon: 'https://anaconda.com/favicon.ico' },
  { name: 'Azure', icon: 'https://skillicons.dev/icons?i=azure' },
  { name: 'C++', icon: 'https://techstack-generator.vercel.app/cpp-icon.svg' },
  { name: 'CSS3', icon: 'https://skillicons.dev/icons?i=css' },
  { name: 'DBeaver', icon: 'https://img.shields.io/badge/DBeaver-1A309F?style=flat&logo=dbeaver&logoColor=white' },
  { name: 'dbt', icon: 'https://img.shields.io/badge/dbt-FF694B?style=flat&logo=dbt&logoColor=white' },
  { name: 'Docker', icon: 'https://skillicons.dev/icons?i=docker' },
  { name: 'Excel', icon: 'https://img.shields.io/badge/Excel-217346?style=flat&logo=microsoftexcel&logoColor=white' },
  { name: 'Flask', icon: 'https://skillicons.dev/icons?i=flask' },
  { name: 'Git', icon: 'https://skillicons.dev/icons?i=git' },
  { name: 'Go', icon: 'https://skillicons.dev/icons?i=go' },
  { name: 'Google Cloud', icon: 'https://skillicons.dev/icons?i=gcp' },
  { name: 'Google Sheets', icon: 'https://img.icons8.com/ios-filled/50/ffffff/google-sheets.png' },
  { name: 'HTML5', icon: 'https://skillicons.dev/icons?i=html' },
  { name: 'MATLAB', icon: 'https://skillicons.dev/icons?i=matlab' },
  { name: 'Matplotlib', icon: 'https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=plastic&logo=Matplotlib&logoColor=black' },
  { name: 'MongoDB', icon: 'https://skillicons.dev/icons?i=mongodb' },
  { name: 'NumPy', icon: 'https://img.shields.io/badge/numpy-%23013243.svg?style=plastic&logo=numpy&logoColor=white' },
  { name: 'Pandas', icon: 'https://img.shields.io/badge/pandas-%23150458.svg?style=plastic&logo=pandas&logoColor=white' },
  { name: 'Plotly', icon: 'https://img.shields.io/badge/Plotly-3F4F75?style=flat&logo=plotly&logoColor=white' },
  { name: 'Postman', icon: 'https://skillicons.dev/icons?i=postman' },
  { name: 'Power BI', icon: 'https://img.shields.io/badge/power_bi-F2C811?style=flat&logo=powerbi&logoColor=black' },
  { name: 'PySpark', icon: 'https://img.shields.io/badge/PySpark-4B6DAD?style=flat&logo=apache spark&logoColor=white' },
  { name: 'Python', icon: 'https://techstack-generator.vercel.app/python-icon.svg' },
  { name: 'PyTorch', icon: 'https://skillicons.dev/icons?i=pytorch' },
  { name: 'R', icon: 'https://skillicons.dev/icons?i=r' },
  { name: 'React', icon: 'https://techstack-generator.vercel.app/react-icon.svg' },
  { name: 'Scikit-Learn', icon: 'https://skillicons.dev/icons?i=scikitlearn' },
  { name: 'Seaborn', icon: 'https://img.shields.io/badge/Seaborn-3776AB?style=flat&logo=python&logoColor=white' },
  { name: 'Shell (Bash)', icon: 'https://skillicons.dev/icons?i=bash' },
  { name: 'Spark', icon: 'https://img.shields.io/badge/Apache%20Spark-FDEE21?style=flat&logo=apachespark&logoColor=black' },
  { name: 'SQL (MySQL)', icon: 'https://skillicons.dev/icons?i=mysql' },
  { name: 'SQL (PostgreSQL)', icon: 'https://skillicons.dev/icons?i=postgres' },
  { name: 'SQL (SparkSQL)', icon: 'https://img.shields.io/badge/SparkSQL-FDEE21?style=flat&logo=apachespark&logoColor=black' },
  { name: 'SQLite', icon: 'https://skillicons.dev/icons?i=sqlite' },
  { name: 'Streamlit', icon: 'https://img.shields.io/badge/Streamlit-%23FE4B4B.svg?style=plastic&logo=streamlit&logoColor=white' },
  { name: 'Swift', icon: 'https://skillicons.dev/icons?i=swift' },
  { name: 'Tableau', icon: 'https://img.shields.io/badge/Tableau-E97627?style=flat&logo=tableau&logoColor=white' },
  { name: 'TensorFlow', icon: 'https://skillicons.dev/icons?i=tensorflow' },
  { name: 'Unity', icon: 'https://img.shields.io/badge/Unity-000000.svg?style=flat&logo=unity&logoColor=white' }
];



const fadeIn = keyframes`
  from { transform: translateY(30px); opacity: 0;}
  to { transform: none; opacity: 1;}
`;

const StackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
  gap: 1.2rem;
  margin: 2.5rem 0;

  @media (min-width: 1200px) {
    /* Increase column count on wide screens */
    grid-template-columns: repeat(7, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
  }
  @media (max-width: 650px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TechCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #181d26 80%, #242d49 100%);
  border: 1.5px solid #272e38;
  border-radius: 14px;
  box-shadow: 0 2px 14px 0 rgba(5, 12, 37, 0.32);
  padding: 20px 8px 14px 8px;
  margin: 0;
  cursor: pointer;
  outline: none;
  animation: ${fadeIn} 900ms ease both;
  will-change: transform;
  transition:
    transform 0.2s cubic-bezier(.44,1.17,.6,1),
    box-shadow 0.18s,
    background 0.26s;
  &:hover,
  &:focus-visible {
    transform: translateY(-8px) scale(1.04);
    background: linear-gradient(120deg, #1e294f 80%, #0952d0 100%);
    box-shadow: 0 8px 32px 0 rgba(20, 100, 255, 0.18);
    border-color: #2984fa;
  }

  img {
    width: 48px;
    height: 48px;
    margin-bottom: 9px;
    filter: grayscale(17%) brightness(1.18) drop-shadow(0 1px 8px #0039fa33);
    transition: filter 0.18s;
    ${props => props.reduceMotion && `
      transition: none;
    `}
  }

  &:hover img,
  &:focus-visible img {
    filter: grayscale(0%) brightness(1.35) drop-shadow(0 0 10px #56dbff88);
  }

  span {
    color: #e0e8fa;
    text-shadow: 0 1px 2px #000;
    font-size: 0.97rem;
    font-family: var(--font-mono, monospace);
    margin-top: 3px;
    letter-spacing: 0.03em;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const TechStackGrid = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <StackGrid>
      {tools.map(tool => (
        <TechCard
          key={tool.name}
          title={tool.name}
          tabIndex={0}
          reduceMotion={prefersReducedMotion}
          aria-label={tool.name}
        >
          <img src={tool.icon} alt={`${tool.name} icon`} />
          <span>{tool.name}</span>
        </TechCard>
      ))}
    </StackGrid>
  );
};

// --- TechStackGrid ends here ---

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const year = new Date().getFullYear() - 2021;
  useEffect(() => {
    if (prefersReducedMotion) return;
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>
      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hey, I'm Hemang Sharma — a Machine Learning Engineer and Data Scientist with a strong full-stack foundation and a passion for building intelligent systems that create real-world impact.
              <br /><br />
              With over {year} years of hands-on experience, I've delivered scalable machine learning, data analytics, and software solutions across property, fintech, and healthcare domains. I specialize in Python, deep learning (TensorFlow, PyTorch), natural language processing, and computer vision, and have production experience deploying models via GCP, Azure, and containerized platforms like Docker and Kubernetes.
              <br /><br />
              My journey has taken me from the serene landscapes of California to the bustling streets of Sydney, where I honed my skills in data science and machine learning. I thrive on solving complex problems and transforming data into actionable insights.
              <br /><br />
              When I'm not wrangling data or fine-tuning models, you’ll probably find me travelling or on badminton courts.
            </p><br />
            <p>
              I'm always on the lookout for new adventures and connections.
            </p>
            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>
        </StyledText>
        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
      <TechStackGrid />
    </StyledAboutSection>
  );
};

export default About;
