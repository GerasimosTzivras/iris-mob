import './circles.scss'

function AnimatedBackground({ children }) {
  return (
    <>
      <div className="w-100 h-100 bg-primary">
        {children}
        <div className="area">
          <ul className="circles">
            <li className='bg-white'></li>
            <li className='bg-white'></li>
            <li className='bg-white'></li>
            <li className='bg-white'></li>
            <li className='bg-white'></li>
            <li className='bg-white'></li>
            <li className='bg-white'></li>
            <li className='bg-white'></li>
            <li className='bg-white'></li>
            <li className='bg-white'></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AnimatedBackground
