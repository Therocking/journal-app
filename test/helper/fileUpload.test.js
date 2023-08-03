import { fileUpload } from "../../src/helper/fileUpload";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'dt55uhyrq', 
    api_key: '194691598616297', 
    api_secret: '_8AreTS_K8G4mOZEwNB5_AxF_wA',
    secure: true
  });

describe('Prebas en fileUpload', () => {
  
    test('debe de subir el archivo a claudinary', async() => {
      
        const imageUrl = 'https://images.unsplash.com/photo-1509043759401-136742328bb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File( [blob], 'foto.jpg' );

        const url = await fileUpload( file );

        expect( typeof url ).toBe( 'string' );

        /* elimina imagen creada */
        const segments = url.split('/');
        const imageId = segments[segments.length - 1 ].replace('.jpg', '');

        await cloudinary.api.delete_resources([imageId],{
            resource_type: 'image'
        });

    });

    test('debe de retornar null', async() => {
              
        const file = new File( [], 'foto.jpg' );
        const url = await fileUpload( file );

        expect( url ).toBe( null )

    })
    
    
})
