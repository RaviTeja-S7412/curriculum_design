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
		$cid = $this->input->post("cid");
		
		$this->db->select("tbl_courses.*");
		$this->db->join("tbl_courses","tbl_program_course_links.course=tbl_courses.id");
		$data = $this->db->get_where("tbl_program_course_links",["tbl_program_course_links.program"=>$id])->result();
		
		$html = '<option value="">Select Course</option>';
		foreach($data as $d){
			$sel = ($cid == $d->id) ? 'selected' : '';	
			$html .= '<option value="'.$d->id.'" '.$sel.'>'.$d->course_name.'</option>';
			
		}
		
		echo $html;
		
	}
	
	public function getsubCategories(){
		
		$id = $this->input->post("id");
		$sub_ids = $this->input->post("sub_ids");
		
		$cdata = $this->db->get_where("tbl_courses",["id"=>$id])->row();
		
		$this->db->select("tbl_subject_category.category_name,tbl_subject_category.id");
		$this->db->join("tbl_subject_category","tbl_subcat_course_links.subject_category=tbl_subject_category.id");
		$data = $this->db->get_where("tbl_subcat_course_links",["tbl_subcat_course_links.course"=>$id])->result();
		
		$subcategories = "";
		foreach($data as $d){
			
			$sel = "";
			
			if(in_array($d->id,$sub_ids)){
				$sel = "selected";
			}
			
			$subcategories .= '<option value="'.$d->id.'" cname="'.$d->category_name.'" '.$sel.'>'.$d->category_name.'</option>';
			
		}
		
		echo json_encode(["subcategories"=>$subcategories,"credits"=>"($cdata->min_credits - $cdata->max_credits)"]);
		
	}
	
	public function getCreditweightage(){
		
		$weightage = $this->input->post("weightage");
		$cid = $this->input->post("cid");
			
		$cw = $this->admin->getCreditweightage($weightage,$cid);
		$max = $cw['max_weightage'];
		$min = $cw['min_weightage'];
		
		echo "<b>Credits:</b> ($max - $min)";
		
	}
	
	public function getWeightages(){
		
		$sub_cats = $this->input->post("sub_cats");
		$weightages = $this->input->post("weightages");
		$cid = $this->input->post("cid");
		
		$html = '';
		
		$tmax = [];
		$tmin = [];
		$totalWeigh = 0;
		
		foreach($sub_cats as $key => $sc){
		
			$wt = $weightages[$sc["id"]];
			
			$cw = $this->admin->getCreditweightage($wt,$cid);
			$max = $cw['max_weightage'];
			$min = $cw['min_weightage'];
				
			if($max)
				$credits = "<b>Credits:</b> ($max - $min)";
			
			$html .= '<div class="form-group row"><label for="staticEmail" class="col-sm-5 col-form-label">'.$sc['cname'].'</label> <div class="col-sm-3"> <input type="text" class="form-control getWeightages" subid="'.$sc['id'].'" name="weightage[]"  placeholder="Weightage in %" value="'.$wt.'" required/><input type="hidden" class="form-control" name="sub_cats[]" value="'.$sc['id'].'"/> </div><div class="col-sm-3 assignCredits-'.$sc['id'].'">'.$credits.'</div></div>';
			
			$tmax[] = $max;
			$tmin[] = $min;
			
			$totalWeigh += $wt;
		
		}
		
		$totalMax = array_sum($tmax);
		$totalMin = array_sum($tmin);
		
		$tcredits = "<b>Credits:</b> ($totalMax - $totalMin)";
		
		$html .= '<div class="form-group row"><label for="staticEmail" class="col-sm-5 col-form-label"><strong>Total</strong></label> <div class="col-sm-3 selWeightage col-form-label" style="text-align:left;"><b>'.$totalWeigh.' %</b></div></div>';
		
		echo $html;
		
	}
	
	public function logout(){
		
		$this->session->sess_destroy();
		redirect("institute-login");
		
	}
	
}
