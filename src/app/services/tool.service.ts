import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  api = environment.apiUrl;
  http = inject(HttpClient);

  mostrarArchivo(folder:string,file:string){
    let url = `${this.api}/mostrarImagen/${folder}/${file}`;
    return this.http.get(url , { responseType: 'blob' });
  }


  mostrarFile(folder:string,file:string){
    let url = `${this.api}/mostrarImagen/${folder}/${file}`;
    return this.http.get(url);
  }

  subirArchivo(files: Array<File>, name:string, url:string){
    let urlCompleta = `${this.api}/${url}`;
    let formdata = new FormData();
    
    if(files){
      for(let i = 0; i < files.length; i++){
        formdata.append(name + '-'+ i,files[i], files[i].name);
     }
    }
   return this.http.post(urlCompleta, formdata);
  }
}



/*
 public function uploadFile( Request $request ){
        if( $request->hasFile('entity_img-0') ){
            $image = $request->file('entity_img-0');
            $fileNameWithExtension = $image->getClientOriginalName();
            Storage::disk('images')->put( $fileNameWithExtension, fopen( $request->file('entity_img-0'), 'r+'));
            $response = [
                'status' => true,                
                'image' => $fileNameWithExtension,                
                'message' => 'La imagen se ha subido con éxito.',                
            ];
        }else {
            $response = [
                'status' => true,                
                'image' => null,                
                'message' => 'La imagen se ha subido con éxito.',                
            ];
            
        }

        return response()->json( $response );
    }

*/