<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\ProfileApp;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class ProfileAppController extends Controller
{
    public function index()
    {
        if(!session()->get('login_akses')) { 
            return redirect('/login'); 
        }
        
        $data['header_title'] = 'PROFILE APP';
        
        return view('backend.profile_app', $data);
    }

    public function loadProfileApp()
    {
        $profile_app = ProfileApp::where('id', 1)->first();
        
        $response = array(
            'status' => TRUE,
            'response' => $profile_app,
            'keyword_explode' => explode(',', $profile_app->keyword),
            'logo_public' => asset('dist/img/logo/'.$profile_app->logo_header_public),
            'banner_login' => asset('dist/img/banner/'.$profile_app->banner_login),
            'backend_logo' => asset('dist/img/logo/'.$profile_app->backend_logo),
            'backend_logo_icon' => asset('dist/img/logo/'.$profile_app->backend_logo_icon),
        );
        return response()->json($response);
    }

    public function profileAppUpdate(Request $request)
    {
		date_default_timezone_set("Asia/Makassar");

        $errors					= [];
        $validator = Validator::make($request->all(), [
            'nama' => 'required|max:255',
            'nama_alias' => 'required|max:60',
            'deskripsi' => 'required|max:160',
            'keyword' => 'required',
            'copyright' => 'required|max:255',
            'logo_header_public' => 'mimes:png,jpg,jpeg|max:2048',
            'banner_login' => 'mimes:png,jpg,jpeg|max:2048',
            'backend_logo' => 'mimes:png,jpg,jpeg|max:2048',
            'backend_logo_icon' => 'mimes:png,jpg,jpeg|max:2048',
        ],[
            'nama.required' => 'Nama situs tidak boleh kosong.',
            'nama.max' => 'Nama situs tidak lebih dari 255 karakter.',
            'nama_alias.required' => 'Nama alias/pendek tidak boleh kosong.',
            'nama_alias.max' => 'Nama alias/pendek tidak lebih dari 60 karakter.',
            'deskripsi.required' => 'Deskripsi tidak boleh kosong.',
            'deskripsi.max' => 'Deskripsi tidak lebih dari 60 karakter.',
            'keyword.required' => 'Keyword tidak boleh kosong.',
            'copyright.required' => 'Copyright tidak boleh kosong.',
            'copyright.max' => 'Copyright tidak lebih dari 255 karakter.',

            'logo_header_public.required' => 'Logo public tidak boleh kosong.',
            'logo_header_public.max' => 'Logo public tidak lebih dari 2MB.',
            'logo_header_public.mimes' => 'Logo public berekstensi jpg jepg png.',

            'banner_login.required' => 'Banner login tidak boleh kosong.',
            'banner_login.max' => 'Banner login tidak lebih dari 2MB.',
            'banner_login.mimes' => 'Banner login berekstensi jpg jepg png.',

            'backend_logo.required' => 'Logo backend tidak boleh kosong.',
            'backend_logo.max' => 'Logo backend tidak lebih dari 2MB.',
            'backend_logo.mimes' => 'Logo backend berekstensi jpg jepg png.',

            'backend_logo_icon.required' => 'Logo backend icon tidak boleh kosong.',
            'backend_logo_icon.max' => 'Logo backend icon tidak lebih dari 2MB.',
            'backend_logo_icon.mimes' => 'Logo backend icon berekstensi jpg jepg png.',

        ]);
    
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            
            if($request->file('logo_header_public')){
                $mainImage = $request->file('logo_header_public');
                $filename = time() . '-logo_public.' . $mainImage->extension();
                Image::make($mainImage)->resize(450,81)->save(public_path('dist/img/logo/'.$filename));
                
                ProfileApp::where('id', 1)->update([
                    'logo_header_public' => $filename,
                ]);
            }
            if($request->file('banner_login')){
                $mainImage = $request->file('banner_login');
                $filename = time() . '-banner_login.' . $mainImage->extension();
                Image::make($mainImage)->resize(550,450)->save(public_path('dist/img/banner/'.$filename));
                
                ProfileApp::where('id', 1)->update([
                    'banner_login' => $filename,
                ]);
            }
            if($request->file('backend_logo')){
                $mainImage = $request->file('backend_logo');
                $filename = time() . '-backend_logo.' . $mainImage->extension();
                Image::make($mainImage)->resize(450,81)->save(public_path('dist/img/logo/'.$filename));
                ProfileApp::where('id', 1)->update([
                    'backend_logo' => $filename,
                ]);
            }
            if($request->file('backend_logo_icon')){
                $mainImage = $request->file('backend_logo_icon');
                $filename = time() . '-backend_logo_icon.' . $mainImage->extension();
                Image::make($mainImage)->resize(727,747)->save(public_path('dist/img/logo/'.$filename));

                ProfileApp::where('id', 1)->update([
                    'backend_logo_icon' => $filename,
                ]);
            }

            $keyword = implode(", ", $request->input('keyword'));
            
            ProfileApp::where('id', 1)->update([
                'nama' => $request->input('nama'),
                'nama_alias' => $request->input('nama_alias'),
                'deskripsi' => $request->input('deskripsi'),
                'keyword' => $keyword,
                'copyright' => $request->input('copyright'),
                'updated_at' => Carbon::now()
            ]);
            $output = array("status" => TRUE);
        }
        return response()->json($output);
    }
}
