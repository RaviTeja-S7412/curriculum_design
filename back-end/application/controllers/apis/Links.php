<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Links extends MY_Controller {

	public function sub_subcategory_link()
	{
		
		$subject_category = $this->input->post("subject_category");
		$subjects = json_decode($this->input->post("subjects"));
		
		if($subject_category == ""){
			echo json_encode(["status"=>false,"msg"=>"Please Select Subject Category."]);
			exit();
		}
		
	// delete unselected subjects
		
		$this->db->where_not_in("subject",$subjects)->delete("tbl_sub_subcat_links",["subject_category"=>$subject_category]);
		
		if(count($subjects) > 0){
			
			foreach($subjects as $subject){
				
				$eChk = $this->db->get_where("tbl_sub_subcat_links",["subject_category"=>$subject_category,"subject"=>$subject])->num_rows();
				
				if($eChk == 0){
					$this->db->insert("tbl_sub_subcat_links",["subject_category"=>$subject_category,"subject"=>$subject]);
				}
					
			}
			
			echo json_encode(["status"=>true,"msg"=>"Successfully Updated"]);
			exit();
			
		}else{
			echo json_encode(["status"=>false,"msg"=>"Please Select Subjects."]);
			exit();
		}
		
	}
	
	public function subcategory_course_link()
	{
		
		$course = $this->input->post("course");
		$subject_category = json_decode($this->input->post("subject_category"));
		
		if($course == ""){
			echo json_encode(["status"=>false,"msg"=>"Please Select Course."]);
			exit();
		}
		
	// delete unselected subject categories
		
		$this->db->where_not_in("subject_category",$subject_category)->delete("tbl_subcat_course_links",["course"=>$course]);
		
		if(count($subject_category) > 0){
			
			foreach($subject_category as $subCat){
				
				$eChk = $this->db->get_where("tbl_subcat_course_links",["subject_category"=>$subCat,"course"=>$course])->num_rows();
				
				if($eChk == 0){
					$this->db->insert("tbl_subcat_course_links",["subject_category"=>$subCat,"course"=>$course]);
				}
					
			}
			
			echo json_encode(["status"=>true,"msg"=>"Successfully Updated"]);
			exit();
			
		}else{
			echo json_encode(["status"=>false,"msg"=>"Please Select Subject Category."]);
			exit();
		}
		
	}
	
	public function course_program_link()
	{
		
		$program = $this->input->post("program");
		$courses = json_decode($this->input->post("course"));
		
		if($program == ""){
			echo json_encode(["status"=>false,"msg"=>"Please Select Program."]);
			exit();
		}
		
	// delete unselected courses
		
		$this->db->where_not_in("course",$courses)->delete("tbl_program_course_links",["program"=>$program]);
		
		if(count($courses) > 0){
			
			foreach($courses as $course){
				
				$eChk = $this->db->get_where("tbl_program_course_links",["program"=>$program,"course"=>$course])->num_rows();
				
				if($eChk == 0){
					$this->db->insert("tbl_program_course_links",["program"=>$program,"course"=>$course]);
				}
					
			}
			
			echo json_encode(["status"=>true,"msg"=>"Successfully Updated"]);
			exit();
			
		}else{
			echo json_encode(["status"=>false,"msg"=>"Please Select Courses."]);
			exit();
		}
		
	}
	
}
