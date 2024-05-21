import React from 'react';
import classes from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.footerContainer}>
        <div>2024</div>
        <div>Made by Ilia Turovchik</div>
        <div>
          <a href="https://github.com/Umbomax" target="_blank" rel="noopener noreferrer" className={classes.githubLink}>
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
