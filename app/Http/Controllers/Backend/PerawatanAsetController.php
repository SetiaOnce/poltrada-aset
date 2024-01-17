<?php

namespace App\Http\Controllers\Backend;

use App\Helpers\Shortcut;
use App\Http\Controllers\Controller;
use App\Models\CekDataAset;
use App\Models\JenisAset;
use App\Models\UnitKerja;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use Yajra\DataTables\Facades\DataTables;

class PerawatanAsetController extends Controller
{
    public function index()
    {
        if(!session()->get('login_akses')) { 
            return redirect('/login'); 
        }
        $data['header_title'] = 'PERAWATAN ASET';
        return view('backend.perawatan', $data);
    }

    public function data(Request $request)
    {

        $tgl_start = Carbon::createFromFormat('d/m/Y', $request->input('tgl_start'))->format('Y-m-d'); 
        $tgl_end = Carbon::createFromFormat('d/m/Y', $request->input('tgl_end'))->format('Y-m-d');
    
        $data = CekDataAset::orderBy('id', 'DESC')->where('jenis_cek_data_aset', 2)->whereBetween('tanggal', [$tgl_start, $tgl_end])->get();
        
        if($request->input('fid_jenis')){
            $data = CekDataAset::select('aset_cek_data_aset.*')
            ->join('aset_data', 'aset_data.id', '=', 'aset_cek_data_aset.fid_data_aset')
            ->orderBy('aset_cek_data_aset.id', 'DESC')
            ->where('aset_cek_data_aset.jenis_cek_data_aset', 2)
            ->whereBetween('aset_cek_data_aset.tanggal', [$tgl_start, $tgl_end])
            ->where('aset_data.fid_jenis', $request->input('fid_jenis'))
            ->get();
        }
        
        return Datatables::of($data)->addIndexColumn()
            ->editColumn('foto', function ($row) {
                $file_image = $row->foto_kegiatan;
                if($file_image==''){
                    $url_file = asset('dist/img/default-placeholder.png');
                } else {
                    if (!file_exists(public_path(). '/dist/img/perawatan/'.$file_image)){
                        $url_file = asset('dist/img/default-placeholder.png');
                        $file_image = NULL;
                    }else{
                        $url_file = url('dist/img/perawatan/'.$file_image);
                    }
                }
                $fileCustom = '<a class="d-block overlay w-100 image-popup" href="'.$url_file.'" title="'.$file_image.'">
                    <img src="'.$url_file.'" class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover rounded w-100" alt="'.$file_image.'" />
                    <div class="overlay-layer card-rounded bg-dark bg-opacity-25">
                        <span class="badge badge-dark"><i class="bi bi-eye fs-3 text-light"></i></span>
                    </div>    
                </a>';
                return $fileCustom;
            })
            ->editColumn('jenis_aset', function ($row) {
                $fid_jenis = $row->aset->fid_jenis;
                return JenisAset::where('id',$fid_jenis)->first()->jenis_aset;
            })
            ->editColumn('data_aset', function ($row) {
                $output = '<div class="text-dark-75 font-weight-bolder font-size-lg mb-0">'.$row->aset->nama.' </div><a href="javascript:void(0);" class="text-muted font-weight-bold text-hover-primary"><strong>Kode : </strong>'.$row->aset->kode.'</a><br><a href="javascript:void(0);" class="text-muted font-weight-bold text-hover-primary"><strong>No.Regist : </strong>'.$row->aset->no_registrasi.'</a>';
                return $output;
            })
            ->editColumn('unit_kerja', function ($row) {
                $fid_unit_kerja = $row->aset->fid_unit_kerja;
                return UnitKerja::where('id',$fid_unit_kerja)->first()->unit_kerja;
            })
            ->editColumn('tgl_perawatan', function ($row) {
                return Shortcut::tanggal($row->tanggal);
            })
            ->addColumn('action', function($row){
                $btnDetail = '<button type="button" class="btn btn-icon btn-circle btn-sm btn-info mb-1 ms-1" data-bs-toggle="tooltip" title="Lihat Detail Data!" onclick="_detail_aset('."'".$row->id."'".');"><i class="bi bi-eye-fill fs-3"></i></button>';
                $btnEdit = '<button type="button" class="btn btn-icon btn-circle btn-sm btn-dark mb-1 ms-1" data-bs-toggle="tooltip" title="Edit data!" onclick="_editData('."'".$row->id."'".');"><i class="la la-edit fs-3"></i></button>';
                // $btnDelete = '<button type="button" class="btn btn-icon btn-circle btn-sm btn-danger mb-1 ms-1" data-bs-toggle="tooltip" title="Hapus data!" onclick="_deleteSlide('."'".$row->id."'".');"><i class="las la-trash-alt fs-3"></i></button>';
                return $btnDetail.$btnEdit;
            })
            ->rawColumns(['foto', 'data_aset', 'action'])
            ->make(true);
    }
    
    public function store(Request $request)
    {
        date_default_timezone_set("Asia/Makassar");

        $errors					= [];
        $validator = Validator::make($request->all(), [
            'fid_aset' => 'required',
            'tanggal_perawatan' => 'required|date_format:d/m/Y',
            'judul_kegiatan' => 'required|max:255',
            'keterangan_perawatan' => 'required',
            'foto_perawatan' => 'required|mimes:jpg,jpeg,png|max:2048',
            'file_pdf' => 'required|mimes:pdf|max:10048',
        ],[
            'fid_aset.required' => 'Data aset tidak boleh kosong.',
            'tanggal_perawatan.max' => 'Tanggal perawatan tidak boleh kosong.',
            'tanggal_perawatan.date_format' => 'Tanggal perawatan harus format tanggal (dd/mm/yyyy).',

            'judul_kegiatan.required' => 'Judul kegiatan tidak boleh kosong.',
            'judul_kegiatan.max' => 'Judul kegiatan lebih dari 255 karakter.',
            'keterangan_perawatan.required' => 'Keterangan perawatan tidak boleh kosong.',

            'foto_perawatan.required' => 'Foto perawatan masih kosong.',
            'foto_perawatan.max' => 'Foto perawatan tidak lebih dari 2MB.',
            'foto_perawatan.mimes' => 'Foto perawatan berekstensi jpg, png, jpeg.',

            'file_pdf.required' => 'File pdf masih kosong.',
            'file_pdf.max' => 'File pdf tidak lebih dari 10MB.',
            'file_pdf.mimes' => 'File pdf berekstensi pdf.',
        ]);
    
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            // save image perawatan
            $mainImage = $request->file('foto_perawatan');
            $imagename = Shortcut::random_strings(20) . '-perawatan.' . $mainImage->extension();
            Image::make($mainImage)->save(public_path('dist/img/perawatan/'.$imagename));
            // save file perawatan
            $mainfile = $request->file('file_pdf');
            $filename = Shortcut::random_strings(20) . '-perawatan.' . $mainfile->extension();
            $mainfile->move('dist/pdf/', $filename);

            // parse date input
            $newDate=Carbon::createFromFormat('d/m/Y', $request->input('tanggal_perawatan'))->format('Y-m-d'); 

            CekDataAset::create([
                'jenis_cek_data_aset' => 2, //Perawatan
                'fid_data_aset' => $request->input('fid_aset'),
                'judul_kegiatan' => $request->input('judul_kegiatan'),
                'keterangan' => $request->input('keterangan_perawatan'),
                'tanggal' => $newDate,
                'foto_kegiatan' => $imagename,
                'file' => $filename,
                'user_add' => session()->get('nama'),
                'created_at' => Carbon::now(),
            ]);
            $output = array("status" => TRUE);
        }
        return response()->json($output);
    }
    
    public function edit(Request $request)
    {
        $data_id = $request->input('idp');
        $detail = CekDataAset::where('id', $data_id)->first();

        $response = array(
            'status' => TRUE,
            'id' => $detail->id,
            'fid_aset' => $detail->fid_data_aset,
            'judul_kegiatan' => $detail->judul_kegiatan,
            'nama' => $detail->aset->kode.' - '.$detail->aset->nama. '( ' . $detail->aset->no_registrasi .' )',
            'tglkegiatan' => Carbon::createFromFormat('Y-m-d', $detail->tanggal)->format('d/m/Y'),
            'urlFoto' => url('dist/img/perawatan/'.$detail->foto_kegiatan),
            'filepdf' => url('dist/pdf/'.$detail->file),
            'keterangan' => $detail->keterangan,
            'id' => $detail->id,
        );
        return response()->json($response);
    }
    
    public function update(Request $request)
    {
        date_default_timezone_set("Asia/Makassar");

        $errors					= [];
        $validator = Validator::make($request->all(), [
            'fid_aset' => 'required',
            'tanggal_perawatan' => 'required|date_format:d/m/Y',
            'judul_kegiatan' => 'required|max:255',
            'keterangan_perawatan' => 'required',
        ],[
            'fid_aset.required' => 'Data aset tidak boleh kosong.',
            'tanggal_perawatan.max' => 'Tanggal perawatan tidak boleh kosong.',
            'tanggal_perawatan.date_format' => 'Tanggal perawatan harus format tanggal (dd/mm/yyyy).',
            'judul_kegiatan.required' => 'Judul kegiatan tidak boleh kosong.',
            'judul_kegiatan.max' => 'Judul kegiatan lebih dari 255 karakter.',
            'keterangan_perawatan.required' => 'Keterangan perawatan tidak boleh kosong.',
        ]);
    
        if($validator->fails()){
            foreach ($validator->errors()->getMessages() as $item) {
                $errors[] = $item;
            }
            $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
        } else {
            if($request->file('foto_perawatan')){
                $validator = Validator::make($request->all(), [
                    'foto_perawatan' => 'required|mimes:jpg,jpeg,png|max:2048',
                ],[
                    'foto_perawatan.required' => 'Foto perawatan masih kosong.',
                    'foto_perawatan.max' => 'Foto perawatan tidak lebih dari 2MB.',
                    'foto_perawatan.mimes' => 'Foto perawatan berekstensi jpg, png, jpeg.',
                ]);
                if($validator->fails()){
                    foreach ($validator->errors()->getMessages() as $item) {
                        $errors[] = $item;
                    }
                    $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
                } else {
                    // save image perawatan
                    $mainImage = $request->file('foto_perawatan');
                    $imagename = Shortcut::random_strings(20) . '-perawatan.' . $mainImage->extension();
                    Image::make($mainImage)->save(public_path('dist/img/perawatan/'.$imagename));

                    CekDataAset::where('id', $request->input('id'))->update([
                        'foto_kegiatan' => $imagename,
                    ]);
                }
            }
            if($request->file('file_pdf')){
                $validator = Validator::make($request->all(), [
                    'file_pdf' => 'required|mimes:pdf|max:10048',
                ],[
                    'file_pdf.required' => 'File pdf masih kosong.',
                    'file_pdf.max' => 'File pdf tidak lebih dari 10MB.',
                    'file_pdf.mimes' => 'File pdf berekstensi pdf.',
                ]);
                if($validator->fails()){
                    foreach ($validator->errors()->getMessages() as $item) {
                        $errors[] = $item;
                    }
                    $output = array("status" => FALSE, "pesan_code" => 'format_inputan', "pesan_error" => $errors);
                } else {
                    // save file perawatan
                    $mainfile = $request->file('file_pdf');
                    $filename = Shortcut::random_strings(20) . '-perawatan.' . $mainfile->extension();
                    $mainfile->move('dist/pdf/', $filename);
                    CekDataAset::where('id', $request->input('id'))->update([
                        'file' => $filename,
                    ]);
                }
            }
            // parse date input
            $newDate=Carbon::createFromFormat('d/m/Y', $request->input('tanggal_perawatan'))->format('Y-m-d'); 
            CekDataAset::where('id', $request->input('id'))->update([
                'jenis_cek_data_aset' => 2, //Perawatan
                'fid_data_aset' => $request->input('fid_aset'),
                'judul_kegiatan' => $request->input('judul_kegiatan'),
                'keterangan' => $request->input('keterangan_perawatan'),
                'tanggal' => $newDate,
                'user_updated' => session()->get('nama'),
                'updated_at' => Carbon::now(),
            ]);
            $output = array("status" => TRUE);
        }
        return response()->json($output);
    }

    public function loadDetail(Request $request)
    {

        $data_id = $request->input('idp');
        $detail = CekDataAset::where('id', $data_id)->first();

        // GETTING FILE AND IMAGE
        $file_image = $detail->foto_kegiatan;
        if($file_image==''){
            $url_file = asset('dist/img/default-placeholder.png');
        } else {
            if (!file_exists(public_path(). '/dist/img/perawatan/'.$file_image)){
                $url_file = asset('dist/img/default-placeholder.png');
                $file_image = NULL;
            }else{
                $url_file = url('dist/img/perawatan/'.$file_image);
            }
        }
        $fileCustom = '<a class="d-block overlay w-100 image-popup" href="javascript:void(0);">
            <img src="'.$url_file.'" class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover rounded w-100" alt="'.$file_image.'" />
        </a>';
        $btn_pdf = '<a href="'.url('dist/pdf/'.$detail->file).'" class="btn btn-sm btn-primary" target="_blank"><i class="bi bi-eye fs-3 text-light"></i> Lihat File</a>';

        // GETTING JENIS ASET
        $fid_jenis = $detail->aset->fid_jenis;
        $jenis_aset = JenisAset::where('id',$fid_jenis)->first()->jenis_aset;
        
        // GETTING UNIT KERJA
        $fid_unit_kerja = $detail->aset->fid_unit_kerja;
        $unit_kerja = UnitKerja::where('id',$fid_unit_kerja)->first()->unit_kerja;
        
        // RESPONSE
        $response = array(
            'status' => TRUE,
            'jenis' => $jenis_aset,
            'unit_kerja' => $unit_kerja,
            'judul_kegiatan' => $detail->judul_kegiatan,
            'nama' => $detail->aset->kode.' - '.$detail->aset->nama. '( ' . $detail->aset->no_registrasi .' )',
            'tglkegiatan' =>Shortcut::tanggal( $detail->tanggal),
            'foto_kegiatan' => $fileCustom,
            'filepdf' => $btn_pdf,
            'keterangan' => $detail->keterangan,
        );
        return response()->json($response);
    }
}
