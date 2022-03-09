<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Semester extends MY_Controller {

	public function create()
	{
		
		$id = $this->input->post("id");	
		$semester_name = $this->input->post("semester_name");
		
		if($semester_name == ""){
			echo json_encode(["status"=>false,"msg"=>"Semester Name is Required"]);
			exit();
		}
		
		if($id){
			$this->db->where(["id !="=>$id]);
		}
		$pChk = $this->db->get_where("tbl_semesters",["semester_name"=>$semester_name])->num_rows();
		if($pChk > 0){
			echo json_encode(["status"=>false,"msg"=>"Semester Name Already Exists"]);
			exit();
		}
		
		
		if($id){
			$status = "Updated";
			$d = $this->db->where("id",$id)->update("tbl_semesters",["semester_name"=>$semester_name]);
		}else{
			$status = "Added";
			$d = $this->db->insert("tbl_semesters",["semester_name"=>$semester_name]);
		}
		
		if($d){
			echo json_encode(["status"=>true,"msg"=>"Semester Successfully $status"]);
		}else{
			echo json_encode(["status"=>false,"msg"=>"Error Occured Please Try Again"]);
		}
		
	}
	
	public function delete()
	{
		
		$id = $this->input->post("id");
		
		if(!$id){
			echo json_encode(["status"=>false,"msg"=>"ID is Required"]);
			exit();
		}
		
		$d = $this->db->where("id",$id)->delete("tbl_semesters");
		
		if($d){
			echo json_encode(["status"=>true,"msg"=>"Semester Successfully Deleted"]);
		}else{
			echo json_encode(["status"=>false,"msg"=>"Error Occured Please Try Again"]);
		}
		
	}
	
	public function updateStatus()
	{
		
		$id = $this->input->post("id");
		$status = $this->input->post("status");
		
		if(!$id){
			echo json_encode(["status"=>false,"msg"=>"ID is Required"]);
			exit();
		}
		if($status == ""){
			echo json_encode(["status"=>false,"msg"=>"Status is Required"]);
			exit();
		}
		
		$d = $this->db->where("id",$id)->update("tbl_semesters",["status"=>$status]);
		
		if($d){
			if($status == 1){
				echo json_encode(["status"=>true,"msg"=>"Semester Successfully Enabled"]);
			}else{
				echo json_encode(["status"=>true,"msg"=>"Semester Successfully Disabled"]);
			}
		}else{
			echo json_encode(["status"=>false,"msg"=>"Error Occured Please Try Again"]);
		}
		
	}
	
	
}
