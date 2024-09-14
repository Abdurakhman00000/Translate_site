import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'
import Translator from '@/components/pages/translator/Translator'
import React from 'react'

const page = () => {
  return (
    <>
    <header>
      <Header/>
    </header>
    
    <section>
    <Translator/>
    </section>

    <footer>
      <Footer/>
    </footer>
    </>
  )
}

export default page