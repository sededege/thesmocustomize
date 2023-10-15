import { useRef, useState } from 'react';
import { storage } from './Firebase';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export const Export = ({ background, weapon, body, clothes, hair, acc, attributes}) => {
 
 

 
  /* const UpdateMetadata = async() => {

    const { uri } = await metaplex
    .nfts()
    .uploadMetadata({
        name: 'Test',
        description: 'asd',
        image: imageAsset,
        attributes: attributes,
        properties: {
            files: [
                {
                    type: imgType,
                    uri: imgUri,
                },
            ]
        }
    });
('   Metadata URI:',uri);
  } */

  const [imageAsset, setImageAsset] = useState('')
  const canvasRef = useRef(null);

  const imageSources = [
    `http://localhost:5173/src/assets/images/Background/${background}.png`,
    `http://localhost:5173/src/assets/images/Weapon/${weapon}.png`,
    `http://localhost:5173/src/assets/images/Body/${body}.png`,
    `http://localhost:5173/src/assets/images/Clothes/${clothes}.png`,
    `http://localhost:5173/src/assets/images/Hair/${hair}.png`,
    `http://localhost:5173/src/assets/images/Acsessores/${acc}.png`,
  ];

  const exportImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const imagePromises = [];

    for (const src of imageSources) {
      imagePromises.push(loadImage(src));
    }

    const uploadImage = (blob) => {
      const imageFile = blob;
      const storageRef = ref(storage, `images/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
    
      uploadTask.on('state_changed', (snapshot) => {
        // You can access upload progress here if needed
      }, (error) => {
        // Handle any upload errors here
        console.error(error);
      }, () => {
        // Upload is complete, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
        });
      });
    }
    

    Promise.all(imagePromises)
      .then((images) => {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          ctx.drawImage(image, 0, 0, 1000, 1000); // Adjust the positioning and size as needed
        }

        // Convert canvas content to a Blob
        canvas.toBlob((blob) => {
          // Upload the image to Firebase Storage
        
   uploadImage(blob)

        }, 'image/png');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  


  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }

  return (
    <div className="tesmo absolute w-[300px] h-[200px] items-center flex justify-center">
      <canvas ref={canvasRef} width="1000" height="1000" style={{ display: 'none' }} />
      <button onClick={exportImage}>Export and Save Image</button>
      <button onClick={() => UpdateMetadata()}>Update metadata</button>
    </div>
  );
}

