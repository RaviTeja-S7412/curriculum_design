<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {
	
	public function __construct(){
		
		parent::__construct();
		if(!$this->session->userdata('institute_id')){
        	redirect('/institute-login');
        }
		
	}

	public function index(){
		$this->load->view('dashboard');
	}
	
	public function create(){
		
		$data["programs"] = $this->db->get_where("tbl_programs",["status"=>1,"deleted"=>0])->result();
		$this->load->view('create',$data);
		
	}
	
	public function addSubjects(){
		
		$data["branch_data"] = json_decode($this->session->userdata("branch_data"));
		$data["sub_categories"] = json_decode($data["branch_data"]->sub_categories);
		
		$this->load->view('addSubjects',$data);
		
	}
	
	public function insertSubjects(){
		
		$inst_id = $this->session->userdata("institute_id");
		$branch_data = json_decode($this->session->userdata("branch_data"));
		$data = $this->input->post();
		
		$subjects = [];
		foreach($branch_data->sub_cats as $sc){
			
			$chkSubjects = $this->input->post("subjects-$sc");
			if(!$chkSubjects){
				echo json_encode(["status"=>false,"msg"=>"Please Select Subjects In All Subject Categories"]);
				exit();
			}
			$subjects[$sc] = $chkSubjects;
			
		}

		$adata = [
			""
		]
		
	}
	
	public function insertBranch(){
		
		$inst_id = $this->session->userdata("institute_id");
		$branch_name = $this->input->post("branch_name");
		$program = $this->input->post("program");
		$course = $this->input->post("course");
		$sub_categories = $this->input->post("sub_categories");
		$weightage = $this->input->post("weightage");
		$sub_cats = $this->input->post("sub_cats");
		
		if(array_sum($weightage) != 100){
			
			echo json_encode(["status"=>false,"msg"=>"weightage should be equal to 100%"]);
			exit();
			
		}
		
		$d = $this->session->set_userdata("branch_data",json_encode($_POST));
		
		if($this->session->userdata("branch_data")){
			
			echo json_encode(["status"=>true,"msg"=>"Branch Created Successfully Please Add Subjects."]);
			exit();
			
		}else{
			
			echo json_encode(["status"=>false,"msg"=>"Error Occured Please Try Again."]);
			exit();
			
		}
		
	}
	
	public function addCredits(){
		
		
	}
		
	public function logout(){
		
		$this->session->sess_destroy();
		redirect("institute-login");
		
	}
	
}
