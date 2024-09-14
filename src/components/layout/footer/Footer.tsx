import React from 'react'
import scss from "./Footer.module.scss"

const Footer = () => {
  return (
    <footer className={scss.footer}>
        <div className="container">
            <div className={scss.content}></div>
        </div>
    </footer>
  )
}

export default Footer