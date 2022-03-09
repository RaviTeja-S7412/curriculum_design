<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Courses extends MY_Controller {

	public function create()
	{
		
		$id = $this->input->post("id");	
		$course_name = $this->input->post("course_name");
		$course_short_code = $this->input->post("course_short_code");
		$min_credits = $this->input->post("min_credits");
		$max_credits = $this->input->post("max_credits");
		
		if($course_name == ""){
			echo json_encode(["status"=>false,"msg"=>"Program Name is Required"]);
			exit();
		}
		if($min_credits == ""){
			echo json_encode(["status"=>false,"msg"=>"Minimum Credits is Required"]);
			exit();
		}
		if($max_credits == ""){
			echo json_encode(["status"=>false,"msg"=>"Maximum Credits is Required"]);
			exit();
		}
		
		if($id){
			$this->db->where(["id !="=>$id]);
		}
		$cChk = $this->db->get_where("tbl_courses",["course_name"=>$course_name])->num_rows();
		if($cChk > 0){
			echo json_encode(["status"=>false,"msg"=>"Course Name Already Exists"]);
			exit();
		}
		
		$data = [
			"course_name" => $course_name,
			"course_short_code" => $course_short_code,
			"min_credits" => $min_credits,
			"max_credits" => $max_credits
		];
		
		if($id){
			$status = "Updated";
			$d = $this->db->where("id",$id)->update("tbl_courses",$data);
		}else{
			$status = "Added";
			$d = $this->db->insert("tbl_courses",$data);
		}
		
		if($d){
			echo json_encode(["status"=>true,"msg"=>"Course Successfully $status"]);
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
		
		$d = $this->db->where("id",$id)->delete("tbl_courses");
		
		if($d){
			echo json_encode(["status"=>true,"msg"=>"Course Successfully Deleted"]);
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
		
		$d = $this->db->where("id",$id)->update("tbl_courses",["status"=>$status]);
		
		if($d){
			if($status == 1){
				echo json_encode(["status"=>true,"msg"=>"Course Successfully Enabled"]);
			}else{
				echo json_encode(["status"=>true,"msg"=>"Course Successfully Disabled"]);
			}
		}else{
			echo json_encode(["status"=>false,"msg"=>"Error Occured Please Try Again"]);
		}
		
	}
}
