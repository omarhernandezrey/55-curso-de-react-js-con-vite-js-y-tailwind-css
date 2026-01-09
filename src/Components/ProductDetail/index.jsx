import { useContext, useState } from 'react'
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext)
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' })

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${context.productToShow.images ? context.productToShow.images[0] : ''})`
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' })
  }

  return (
    <aside
      className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black bg-white rounded-l-2xl shadow-2xl w-[360px] h-[calc(100vh-68px)] top-[68px] transition-transform duration-300 z-20 overflow-hidden`}>
      
      {/* Header Sticky */}
      <div className='flex justify-between items-center p-6 border-b border-gray-50 bg-white z-10 flex-none'>
        <h2 className='font-bold text-xl text-gray-800 tracking-tight'>Detalle</h2>
        <div 
          onClick={() => context.closeProductDetail()}
          className='cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-all duration-200 group'
        >
          <XMarkIcon className='h-6 w-6 text-gray-400 group-hover:text-red-500 transition-colors' />
        </div>
      </div>

      <div className='flex flex-col flex-1 min-h-0'>
        {/* Imagen con Lupa tipo Mercado Libre / Amazon */}
        <figure className='px-6 pt-4 flex-none relative z-10'>
          <div 
            className='relative w-full h-64 rounded-2xl overflow-hidden group shadow-sm bg-gray-50 cursor-crosshair'
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
             <img
              className='w-full h-full object-cover transition-opacity duration-300'
              src={context.productToShow.images ? context.productToShow.images[0] : ''}
              alt={context.productToShow.title} 
              style={{ opacity: zoomStyle.display === 'block' ? 0 : 1 }}
            />
            {/* Capa de Zoom */}
             <div 
              className='absolute inset-0 w-full h-full bg-no-repeat pointer-events-none'
              style={{
                ...zoomStyle,
                backgroundSize: '200%', // Nivel de Zoom (2x)
              }}
            />
            
            <span 
              className={`absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 transition-opacity duration-300 ${zoomStyle.display === 'block' ? 'opacity-0' : 'opacity-100'}`}
            >
              {context.productToShow.category?.name}
            </span>
          </div>
        </figure>

        {/* Información con scroll interno inteligente */}
        <div className='flex flex-col px-6 py-4 flex-1 min-h-0'>
            <div className='flex justify-between items-start mb-2 flex-none'>
                 <h1 className='font-bold text-lg text-gray-900 leading-tight w-2/3 line-clamp-2' title={context.productToShow.title}>
                    {context.productToShow.title}
                 </h1>
                 <span className='font-bold text-lg text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg shadow-sm'>
                    ${context.productToShow.price}
                 </span>
            </div>
            
            <div className='flex-1 overflow-y-auto pr-2 custom-scroll mb-4'>
                <p className='font-light text-sm text-gray-600 leading-relaxed text-justify'>
                    {context.productToShow.description}
                </p>
            </div>

            {/* Botón de acción fijo al final */}
            <div className='flex-none'>
                 <button 
                  className='w-full bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 active:scale-95 transition-all shadow-lg flex justify-center items-center gap-2 group'
                  onClick={() => context.setCount(context.count + 1)}
                 >
                    <ShoppingBagIcon className='h-5 w-5 text-white group-hover:animate-bounce'/>
                    Añadir al carrito
                 </button>
            </div>
        </div>
      </div>
    </aside>
  )
}



export default ProductDetail