<template>
  <div class="page-header clear-filter" filter-color="white">
    <div class="page-header-image" style="background-image: url('img/house.jpg')"></div>
    <div class="content">
      <div class="container">
        <div class="col-md-12 ml-auto mr-auto">
          <card type="login" plain>
            
            <div slot="header" class="logo-container">
              <img src="img/now-logo.png"/>
            </div>
            
            <!-- <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Email...">
            </fg-input> -->
            <fg-input class="no-border input-lg" placeholder="Email...">
            </fg-input>

            <!-- <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons text_caps-small"
              placeholder="Password...">
            </fg-input> -->
            <fg-input class="no-border input-lg" placeholder="Password...">
            </fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <a href="#pablo" id="loginButton" class="btn btn-primary btn-round btn-lg btn-block" >Login</a>
              </div>
              <div class="pull">
                <h6>
                  <a href="#pablo" class="link footer-link">Create Account</a>
                </h6>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput } from '@/components';
export default {
  name: 'login-page',
  bodyClass: 'login-page',
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  }
};
</script>
