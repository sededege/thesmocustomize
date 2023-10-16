import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { data } from './assets/data.jsx'
import CardItem from './components/CardItem.jsx'
import { Export } from './Export.js'


function Home({ nftselected, randombg, bodytrait, randomTrait, randomclothes, randomacc, randomweapon, randomhair, randomqty}) {
  const [categorieselect, setCategorieselect] = useState([])
  const [acc, setAcc] = useState(''); // State for "Acc"
  const [background, setBackground] = useState(randombg); // State for "Background"
  const [body, setBody] = useState(data[1].types.filter(a => a.name === bodytrait)[0].id); // State for "Body"
  const [clothes, setClothes] = useState(''); // State for "Clothes"
  const [hair, setHair] = useState(''); // State for "Hair"
  const [weapon, setWeapon] = useState(''); // State for "Weapon"


  useEffect(() => {
    setCategorieselect(data[0])


if(randomqty === 2){
    if (data[randomTrait].name === 'Acsessores') {
      setAcc(Math.floor(Math.random() * data[randomTrait].types?.length) + 1)
    }

    if (data[randomTrait].name === 'Clothes') {
      setClothes(Math.floor(Math.random() * data[randomTrait].types?.length) + 1)
    }
    if (data[randomTrait].name === 'Hair') {
      setHair(Math.floor(Math.random() * data[randomTrait].types?.length) + 1)
    }
    if (data[randomTrait].name === 'Weapon') {
      setWeapon(Math.floor(Math.random() * data[randomTrait].types?.length) + 1)
    }
  }

  if ( randomqty === 4){
    setClothes(randomclothes)
    setHair(randomhair)
    setWeapon(randomweapon)
    setAcc(randomacc)
  }

  }, [])

  const updateMetadata = () => {
    alert('asd')
  }

  const agregar = (cat, item) => {
    if (cat === 'Background') {
      setBackground(item.id)
    }
    if (cat === 'Acsessores') {
      setAcc(item.id)
    }
    if (cat === 'Body') {
      setBody(item.id)
    }
    if (cat === 'Clothes') {
      setClothes(item.id)
    }
    if (cat === 'Hair') {
      setHair(item.id)
    }
    if (cat === 'Weapon') {
      setWeapon(item.id)
    }
  }

  const What = (cat) => {

    if (cat === 'Background') {
      return background
    }
    if (cat === 'Body') {
      return body
    }
    if (cat === 'Acsessores') {
      return acc
    }
    if (cat === 'Clothes') {
      return clothes
    }
    if (cat === 'Hair') {
      return hair
    }
    if (cat === 'Weapon') {
      return weapon
    }
  }


  return (
    <div >
      <p className='font-bold mt-4 mb-4'>Build your Thesmo!</p>
      <div className=' fixed left-[2vw] rounded-lg top-[10vh] w-[96vw]  bg-slate-800 p-10 z-[20] h-[80vh]  flex flex-col overflow-auto bg-opacity-95 '>

        <div className='col-span-1   h-full items-center flex justify-center gap-10 cursor-pointer'>
          <ul className='flex gap-4 '>
            {
              data.map(a => <li className={`${categorieselect.name === a.name ? 'bg-sky-800 rounded-lg px-4 py-1  text-blue-200' : 'rounded-lg px-4 py-1  text-blue-200'} cursor-pointer transition-all 2s`} onClick={() => setCategorieselect(data.filter(b => b.name === a.name)[0])}> {a.name}</li>)
            }

          </ul>
        </div>
        <div className='flex'>

          <div className=' p-4 gap-4 grid grid-cols-4 w-3/4  '>
            {
              categorieselect?.types?.map((a, index) =>
                <div className={`${index + 1 === What(categorieselect.name) ? 'border-2 border-teal-500 rounded-lg' : 'border-0'} `}>
                  <CardItem agregar={agregar} cat={categorieselect.name} item={a} />
                </div>
              )
            }
          </div>
          <div className='p-4 rounded-lg  items-center justify-center   w-1/4 fixed right-6 top-[20vh] h-[60vh]'>
            <div className='absolute h-full w-full left-0 top-0  justify-center flex'>

              <div className='tesmo absolute w-[300px] h-[200px] items-center flex justify-center '>
                {
                  background && <img
                    src={`http://localhost:5173/src/assets/images/Background/${background}.png`}
                    alt="Background Image"
                    className="absolute rounded-lg z-0 object-fill"
                  />
                }

                {
                  weapon && <img
                    src={`http://localhost:5173/src/assets/images/Weapon/${weapon}.png`}
                    alt="Background Image"
                    className="absolute rounded-lg z-2 object-cover"
                  />
                }

                {
                  body && <img
                    src={`http://localhost:5173/src/assets/images/Body/${body}.png`}
                    alt="Background Image"
                    className="absolute rounded-lg z-2 object-cover"
                  />
                }


                {
                  clothes && <img
                    src={`http://localhost:5173/src/assets/images/Clothes/${clothes}.png`}
                    alt="Background Image"
                    className="absolute rounded-lg z-2"
                  />
                }


                {
                  hair && <img
                    src={`http://localhost:5173/src/assets/images/Hair/${hair}.png`}
                    alt="Background Image"
                    className="absolute rounded-lg z-2"
                  />
                }

                {
                  acc && <img
                    src={`http://localhost:5173/src/assets/images/Acsessores/${acc}.png`}
                    alt="Background Image"
                    className="absolute rounded-lg z-2"
                  />
                }

              </div>

              <div className='absolute bottom-10'>
                {/*                 <Export attributes={nftselected.metadata.attributes} background={background} acc={acc} body={body} weapon={weapon} hair={hair} clothes={clothes} />
 */}
                <p className='text-white font-semibold '>
                  {nftselected?.metadata?.name}
                </p>
                <p className='text-white font-semibold '>
                  Total: 1 SOL
                </p>
                <button className='mt-2' onClick={() => updateMetadata()}>Update metadata</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home