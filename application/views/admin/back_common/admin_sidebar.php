 <? $uri = $this->uri->segment(2) ?> 
 <? $suri = $this->uri->segment(3) ?> 
   
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="<? echo base_url('admin/dashboard') ?>" class="brand-link">
<!--      <img src="<? echo base_url('assets/') ?>dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">-->
      <span class="brand-text font-weight-light text-center">CURRICULUM DESIGN</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="<? echo base_url('assets/') ?>dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="<? echo base_url('admin/dashboard') ?>" class="d-block">Super Admin</a>
        </div>
      </div>


      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <a href="<? echo base_url('admin/dashboard') ?>" class="nav-link <? echo ($uri == "dashboard") ? 'active' : '' ?>">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
              </p>
            </a>
          </li>
          <li class="nav-item  <? echo ($uri == "settings") ? 'menu-open' : '' ?>">
            <a href="#" class="nav-link <? echo ($uri == "settings") ? 'active' : '' ?>">
              <i class="nav-icon fas fa-cog"></i>
              <p>
                Settings
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="<? echo base_url('admin/settings/programs') ?>" class="nav-link <? echo ($suri == "programs") ? 'active' : '' ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Programs</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="<? echo base_url('admin/settings/courses') ?>" class="nav-link <? echo ($suri == "courses") ? 'active' : '' ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Courses</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="<? echo base_url('admin/settings/Subcategories') ?>" class="nav-link <? echo ($suri == "Subcategories") ? 'active' : '' ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Subject Categories</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="<? echo base_url('admin/settings/subjects') ?>" class="nav-link <? echo ($suri == "subjects") ? 'active' : '' ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Subjects</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="<? echo base_url('admin/settings/semesters') ?>" class="nav-link <? echo ($suri == "semesters") ? 'active' : '' ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Semesters</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item  <? echo ($uri == "links") ? 'menu-open' : '' ?>">
            <a href="#" class="nav-link <? echo ($uri == "links") ? 'active' : '' ?>">
              <i class="nav-icon fas fa-link"></i>
              <p>
                Links
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="<? echo base_url('admin/links/subcategoryLinks') ?>" class="nav-link <? echo ($suri == "subcategoryLinks" || $suri == "cusubcategoryLink") ? 'active' : '' ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Subject To Sub Category</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="<? echo base_url('admin/links/courseLinks') ?>" class="nav-link <? echo ($suri == "courseLinks" || $suri == "cucourseLink") ? 'active' : '' ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Sub Category To Course</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="<? echo base_url('admin/links/programLinks') ?>" class="nav-link <? echo ($suri == "programLinks" || $suri == "cuprogramLink") ? 'active' : '' ?>">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Program To Course</p>
                </a>
              </li>
			</ul> 
		  </li>	 
       	  <li class="nav-item">
            <a href="<? echo base_url('admin/institutions') ?>" class="nav-link <? echo ($uri == "institutions") ? 'active' : '' ?>">
              <i class="nav-icon fas fa-university"></i>
              <p>
                Institutions
              </p>
            </a>
		  </li>  	
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
