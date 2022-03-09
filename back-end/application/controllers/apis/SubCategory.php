<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SubCategory extends MY_Controller {

	public function create()
	{
		
		$id = $this->input->post("id");	
		$category_name = $this->input->post("category_name");
		
		if($category_name == ""){
			echo json_encode(["status"=>false,"msg"=>"Category Name is Required"]);
			exit();
		}
		
		if($id){
			$this->db->where(["id !="=>$id]);
		}
		$pChk = $this->db->get_where("tbl_subject_category",["category_name"=>$category_name])->num_rows();
		if($pChk > 0){
			echo json_encode(["status"=>false,"msg"=>"Category Name Already Exists"]);
			exit();
		}
		
		
		if($id){
			$status = "Updated";
			$d = $this->db->where("id",$id)->update("tbl_subject_category",["category_name"=>$category_name]);
		}else{
			$status = "Added";
			$d = $this->db->insert("tbl_subject_category",["category_name"=>$category_name]);
		}
		
		if($d){
			echo json_encode(["status"=>true,"msg"=>"Category Successfully $status"]);
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
		
		$d = $this->db->where("id",$id)->delete("tbl_subject_category");
		
		if($d){
			echo json_encode(["status"=>true,"msg"=>"Category Successfully Deleted"]);
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
		
		$d = $this->db->where("id",$id)->update("tbl_subject_category",["status"=>$status]);
		
		if($d){
			if($status == 1){
				echo json_encode(["status"=>true,"msg"=>"Category Successfully Enabled"]);
			}else{
				echo json_encode(["status"=>true,"msg"=>"Category Successfully Disabled"]);
			}
		}else{
			echo json_encode(["status"=>false,"msg"=>"Error Occured Please Try Again"]);
		}
		
	}
	
	
}
