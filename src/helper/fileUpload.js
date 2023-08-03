

export const fileUpload = async( file ) => {
    // if(!file) throw new Error('No se encontro ningun archivo.');
    if(!file) return null

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dt55uhyrq/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append( 'file', file );

    try {
        
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });

        if( !resp.ok ) throw new Error('No se pudo subir la imagen.')

        const cloudResp = await resp.json();

        return cloudResp.secure_url

    } catch (error) {
        return null
        // console.log(error);
        // throw new Error(error.message)
    }
} 