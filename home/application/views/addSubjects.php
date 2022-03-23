<? $this->load->view("front_common/header") ?>

<style>

	.col-form-label {
		text-align: right;
	}

</style>

	<div class="content1">
      <div class="container">
        <h4><? echo ($this->input->get("bid") != "") ? 'Update' : 'Add'; ?>  Subjects To Subject Categories</h4>
       <!-- <form method="post" id="addSubjects" action="#<? //echo base_url("dashboard/insertSubjects") ?>"> -->
        <form method="post" id="addSubjects">
			<div class="col-lg-12 card-col">

				<? if(count($sub_categories) > 0){ 
					foreach($sub_categories as $key => $sc){
						
						$scdata = $this->db->get_where("tbl_subject_category",["id"=>$sc])->row();
						$exSubdata = json_decode($ubranch_data->subjects)->$sc;
						
				?>

					<h5><? echo $scdata->category_name ?></h5>
						<select multiple="multiple" name="subjects-<? echo $sc ?>[]" id="subjects-<? echo $sc ?>" title="duallistbox_demo1[]">
						<?
							$this->db->select("tbl_subjects.id,tbl_subjects.subject_name");
							$this->db->join("tbl_subjects","tbl_sub_subcat_links.subject=tbl_subjects.id");
							$subjects = $this->db->get_where("tbl_sub_subcat_links",["tbl_sub_subcat_links.subject_category"=>$sc])->result();
									
							foreach($subjects as $sub){		
						
								$ssel = "";
								if(in_array($sub->id,$exSubdata)){
									$ssel = "selected";
								}
								
								echo '<option value="'.$sub->id.'" '.$ssel.'>'.$sub->subject_name.'</option>';
								
							}
						?>			
						</select>
					<br><br>
<!--					<input type="hidden" name="subjects-<? //echo $sc->id ?>" id="sub_cat_subjects-<? //echo $sc ?>">-->

				<? } ?>	
					<input type="submit" class="btn btn-primary" value="Submit">
				<? } ?>		
			  <br><br>
			</div>
     	</form>
      </div>
    </div>
<? $this->load->view( "front_common/footer" ) ?>

<script type="text/javascript">
	
	<? if(count($sub_categories) > 0){ 
			foreach($sub_categories as $key => $sc1){ 
	?>			
		$('#subjects-<? echo $sc1 ?>').bootstrapDualListbox();			
	<?			
			}
	   }
	?>
	
	$("#addSubjects").submit(function(e){
		
		e.preventDefault();
		var fdata = $(this).serialize();
		$.ajax({
			type : "post",
			url : "<? echo base_url("dashboard/insertSubjects") ?>",
			data : fdata,
			dataType: "json",
			success : function(data){
				console.log(data);
				if(data.status){
					swal(
					  '',
					  data.msg,
					  'success'
					);
					setTimeout(function(){
						window.location.href = "<? echo base_url('create-design/add-credits?bid=') ?>"+data.bid;
					},3000)
				}else{
					swal(
					  '',
					  data.msg,
					  'error'
					);
				}
			},
			error : function(data){
				console.log(data);
				$("#rmsg").html(data.msg);
			}
		})
		
	})
	
</script>