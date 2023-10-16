import { WalletMultiButton } from '@solana/wallet-adapter-material-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import Home from './Home'
import metaplex from '@metaplex-foundation/js';
import { start, uploadMetadata } from './metaplex';

const Select = ({ nfts }) => {

    const [nftsAttributes, setNftsAttributes] = useState([])
    const [select, setSelect] = useState([])
    const [play, setPlay] = useState(false)
    const [randombg, setRandomBg] = useState(false)
    const [randomweapon, setRandomWeapon] = useState(false)
    const [randomacc, setRandomAcc] = useState(false)
    const [randomhair, setRandomHair] = useState(false)
    const [randomclothes, setRandomClothes] = useState(false)
    const [randomqty, setRandomQty] = useState('')
    const [randomTrait, setRandomTrait] = useState(false)
    const [body, setBodyTrait] = useState(false)

    const images = async (nft, url) => {
        setNftsAttributes([])


        const image = await fetch(url)
            .then(response => response.json())
            .then(data =>
                setNftsAttributes(prev => [...prev,
                {
                    nft: nft,
                    metadata: data,
                }
                ])

            )



    }



    useEffect(() => {

        nfts.map(
            a => images(a, a.uri)
        )

    }, [nfts])


    const randomtrait = () => {

        setBodyTrait(select.metadata.attributes.filter(a => a.trait_type === 'Skin')[0].value)
        setRandomBg(Math.floor(Math.random() * 15) + 1);
        setPlay(true)
        const numbers = [2, 3, 4, 5];
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const randomNum = numbers[randomIndex];
        setRandomTrait(randomNum)
        setRandomQty(2)

    }

    const randomtraitdos = () => {

        setBodyTrait(select.metadata.attributes.filter(a => a.trait_type === 'Skin')[0].value)
        setRandomBg(Math.floor(Math.random() * 15) + 1);
        setRandomWeapon(Math.floor(Math.random() * 5) + 1);
        setRandomHair(Math.floor(Math.random() * 25) + 1);
        setRandomAcc(Math.floor(Math.random() * 15) + 1);
        setRandomClothes(Math.floor(Math.random() * 15) + 1);
        setPlay(true)
        setRandomQty(4)



    }

    return (
        <div className='w-full items-center justify-center h-full  flex flex-col gap-4 py-10'>
            <WalletMultiButton />
            <div>
                {
                    play && <Home randomqty={randomqty} randomacc={randomacc} randombg={randombg} bodytrait={body} nftselected={select} randomTrait={randomTrait} randomweapon={randomweapon} randomclothes={randomclothes} randomhair={randomhair} />
                }
            </div>
            <div className='relative w-1/2 h-[80vh] justify-center flex flex-col pb-10 px-4 overflow-auto'>

                <div className='grid grid-cols-4 gap-4 '>
                    {
                        nftsAttributes?.map(
                            a =>
                                <div onClick={() => setSelect(a)} className={`${select === a ? 'border-4 p-2 rounded-lg border-teal-700' : 'border-none'} transition-all 2s`}>
                                    <img className='object-cover rounded-lg' src={a.metadata.image} />
                                    <p className='text-center mt-2'> {a.metadata.name}</p>
                                </div>
                        )
                    }
                </div>




            </div>
            <div className='flex gap-4'>
                <button onClick={() => randomtrait()} >2 random traits</button>
                <button onClick={() => randomtraitdos()} >4 random traits</button>
                <button>Shop</button>

            </div>
        </div>
    )
}

export default Select