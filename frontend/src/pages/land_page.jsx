import BackgroundGraph from '../components/backgroundGraph.jsx';
import '../styles/landing.css';

const landingPage = () => {
  return (
    <div className="marketing-container">
      {/* Background Graph */}
      <div className="graph-background">
        <BackgroundGraph />
      </div>
      
      {/* Content Overlay */}
      <div className="content-overlay">
        <div className="header">
          <h1 className="title">CLUE AI</h1>
        </div>
        
        <div className="main-content">
          <h2 className="subtitle">Simulating</h2>
          <h2 className="subtitle">Worlds For Better</h2>
          <h2 className="subtitle">Marketing</h2>
        </div>

        <div className="cta-section">
          <button className="cta-button">Get Started</button>
          <p className="cta-text">Transform your marketing strategy with AI</p>
        </div>
      </div>
    </div>
  );
};

export default landingPage;