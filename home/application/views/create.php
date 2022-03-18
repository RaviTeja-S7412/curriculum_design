<? $this->load->view("front_common/header") ?>

<style>

	.col-form-label {
		text-align: right;
	}

</style>

<div class="content1">
	<div class="container">
		<h4>Curriculum Design</h4>
		<div class="col-lg-12 card-col">
			<form method="post" id="createBranch">
				<div class="row mt-4" id="create_fields">
					<div class="col-lg-6">
						<select class="custom-select" name="program" id="program" required>
							<option value="">Program</option>
							<? foreach($programs as $p){
								echo '<option value="'.$p->id.'">'.$p->program_name.'</option>';
							} ?>
						</select>
					</div>
					<div class="col-lg-6">
						<select class="custom-select" name="course" id="courses" required>
							<option value="">Course</option>
						</select>
					</div>
					<div class="col-lg-12">
						<br/>
						<div class="form-group">
							<label for="usr">Course / Branch name:</label>
							<input type="text" class="form-control" name="branch_name" id="branch_name"/>
						</div>
					</div>
					<div class="col-lg-12">
						<div class="form-group">
							<label for="usr">Subject Categories </label>
							<input type="hidden" name="sub_categories" id="sub_categories">
							<div id="sub_cats" class="transfer-demo"></div>
						</div>
						<input type="button" class="btn btn-primary" id="gotoWeightage" value="Submit">
					</div>
					
				</div>

				<div class="row" id="selectWeightage" style="display: none">
					<div class="col-lg-12 ml-auto d-flex">
						<i class="fa fa-arrow-left fa-2x backFields pull-left" style="cursor: pointer"></i>
						<p class="mb-0 text-dark p-1 ml-auto"><b style="font-weight: 700;">Total Percentage:</b> <b>100 %</b></p>
					</div>
					<h4 style="text-align: center;margin-bottom: 40px;margin-top: 10px;">Enter Weightages</h4>
					<div class="col-lg-12" align="right">
						
					</div>
					<div class="col-lg-9 offset-2 subcategories_weightages">
						
					</div>
					<div class="col-lg-12" align="center">
						<input type="submit" value="Submit" class="btn btn-primary">
					</div>
				</div>
			</form>	
		</div>
	</div>
</div>

<? $this->load->view( "front_common/footer" ) ?>

<script type="text/javascript">
	
	$("#createBranch").submit(function(e){
		
		e.preventDefault();
		var fdata = $(this).serialize();
		$.ajax({
			type : "post",
			url : "<? echo base_url('dashboard/insertBranch') ?>",
			data : fdata,
			dataType: "json",
			success : function(data){
				if(data.status){
					swal(
					  '',
					  data.msg,
					  'success'
					);
					setTimeout(function(){
						window.location.href = "<? echo base_url('create-design/add-subjects') ?>";
					},3000)
				}else{
					swal(
					  '',
					  data.msg,
					  'error'
					);
					return false;
				}
			},
			error : function(data){
				console.log(data);
				swal(
				  data.msg,
				  '',
				  'error'
				);
				return false;
			}
		})
		
	});

	
	$(".backFields").click(function(){
		
		$("#create_fields").show();
		$("#selectWeightage").hide();
		
	})
	
	$("#program").change(function(){
		
		var id = $(this).val();
		$.ajax({
			type: "post",
			data: {id:id},
			url: "<? echo base_url('ajax/getCourses') ?>",
			success: function(data){
				$("#courses").html(data);
			}
		})
		
	})
	
	$("#courses").change(function(){
		
		var id = $(this).val();
		$.ajax({
			type: "post",
			data: {id:id},
			dataType: "json",
			url: "<? echo base_url('ajax/getsubCategories') ?>",
			success: function(data){
				
				console.log(data);
				
				var settings1 = {
					dataArray: data,
					itemName: "category_name",
					valueName: "id",
					callable: function ( items ) {
						console.dir( items );
						$("#sub_categories").val(JSON.stringify(items))
					},
				};

				$( "#sub_cats" ).transfer( settings1 );
			},
			error: function(data){
				console.log(data)
			}
		})
		
	})
	
	$("#gotoWeightage").click(function(){
		
		var program = $("#program").val();
		var courses = $("#courses").val();
		var branch_name = $("#branch_name").val();
		var sub_categories = $("#sub_categories").val();
		
		if(program == ""){
			swal(
			  'Program Name Is Required',
			  '',
			  'error'
			);
			return false;
		}
		if(courses == ""){
			swal(
			  'Course Name Is Required',
			  '',
			  'error'
			);
			return false;
		}
		if(branch_name == ""){
			swal(
			  'Branch Name Is Required',
			  '',
			  'error'
			);
			return false;
		}
		if(sub_categories == ""){
			swal(
			  'Sub Categories Is Required',
			  '',
			  'error'
			);
			return false;
		}
		
		var scategories = JSON.parse(sub_categories);
		
		var scats = "";
		scategories.forEach(function(element){  
			scats += '<div class="form-group row"><label for="staticEmail" class="col-sm-5 col-form-label">'+element.category_name+'</label> <div class="col-sm-5"> <input type="text" class="form-control" name="weightage[]"  placeholder="Weightage in %" required/><input type="hidden" class="form-control" name="sub_cats[]" value="'+element.id+'"/> </div></div>';
		}); 
		
		$(".subcategories_weightages").html(scats);
		$("#create_fields").hide();
		$("#selectWeightage").show();
		
	})
	
</script>