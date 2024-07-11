import React from 'react';
import classes from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.footerContainer}>
        <div>2024</div>
        <div className={classes.author}>Made by <br/> Ilia Turovchik</div>
        <div className={classes.socialLinks}>
          <a href="https://github.com/Umbomax" target="_blank" rel="noopener noreferrer" className={classes.githubLink}>
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a href="https://www.linkedin.com/in/umbomax/" target="_blank" rel="noopener noreferrer" className={classes.linkedinLink}>
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
