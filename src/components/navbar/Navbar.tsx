function Navbar() {
 
  

  return (
    <>
     <div className='w-full bg-gray-500 text-white flex justify-center py-3 border-2 border-black'>
          <div className="container flex justify-between text-lg min-w-full pr-16 pl-16">
            <div className='text-2xl font-bold uppercase'>Farmácia Performance GOALS</div>

            <div className='flex gap-4'>
              <div className='hover:underline'>Produtos</div>
              <div className='hover:underline'>Categorias</div>
              <div className='hover:underline'>Sair</div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar