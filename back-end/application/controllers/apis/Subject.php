<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Subject extends MY_Controller {

	public function create()
	{
		
		$id = $this->input->post("id");	
		$subject_name = $this->input->post("subject_name");
		
		if($subject_name == ""){
			echo json_encode(["status"=>false,"msg"=>"Subject Name is Required"]);
			exit();
		}
		
		if($id){
			$this->db->where(["id !="=>$id]);
		}
		$pChk = $this->db->get_where("tbl_subjects",["subject_name"=>$subject_name])->num_rows();
		if($pChk > 0){
			echo json_encode(["status"=>false,"msg"=>"Subject Name Already Exists"]);
			exit();
		}
		
		
		if($id){
			$status = "Updated";
			$d = $this->db->where("id",$id)->update("tbl_subjects",["subject_name"=>$subject_name]);
		}else{
			$status = "Added";
			$d = $this->db->insert("tbl_subjects",["subject_name"=>$subject_name]);
		}
		
		if($d){
			echo json_encode(["status"=>true,"msg"=>"Subject Successfully $status"]);
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
		
		$d = $this->db->where("id",$id)->delete("tbl_subjects");
		
		if($d){
			echo json_encode(["status"=>true,"msg"=>"Subject Successfully Deleted"]);
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
		
		$d = $this->db->where("id",$id)->update("tbl_subjects",["status"=>$status]);
		
		if($d){
			if($status == 1){
				echo json_encode(["status"=>true,"msg"=>"Subject Successfully Enabled"]);
			}else{
				echo json_encode(["status"=>true,"msg"=>"Subject Successfully Disabled"]);
			}
		}else{
			echo json_encode(["status"=>false,"msg"=>"Error Occured Please Try Again"]);
		}
		
	}
	
	
}
