<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ajax extends CI_Controller {
	
	public function __construct(){
		
		parent::__construct();
		if(!$this->session->userdata('institute_id')){
        	redirect('/institute-login');
        }
		
	}

	public function getCourses(){
		
		$id = $this->input->post("id");
		
		$this->db->select("tbl_courses.*");
		$this->db->join("tbl_courses","tbl_program_course_links.course=tbl_courses.id");
		$data = $this->db->get_where("tbl_program_course_links",["tbl_program_course_links.program"=>$id])->result();
		
		$html = '<option value="">Select Course</option>';
		foreach($data as $d){
			
			$html .= '<option value="'.$d->id.'">'.$d->course_name.'</option>';
			
		}
		
		echo $html;
		
	}
	
	public function getsubCategories(){
		
		$id = $this->input->post("id");
		
		$this->db->select("tbl_subject_category.category_name,tbl_subject_category.id");
		$this->db->join("tbl_subject_category","tbl_subcat_course_links.subject_category=tbl_subject_category.id");
		$data = $this->db->get_where("tbl_subcat_course_links",["tbl_subcat_course_links.course"=>2])->result();
		
		echo json_encode($data);
		
	}
	
	public function create(){
		
		$data["programs"] = $this->db->get_where("tbl_programs",["status"=>1,"deleted"=>0])->result();
		$this->load->view('create',$data);
		
	}
	
	public function logout(){
		
		$this->session->sess_destroy();
		redirect("institute-login");
		
	}
	
}
