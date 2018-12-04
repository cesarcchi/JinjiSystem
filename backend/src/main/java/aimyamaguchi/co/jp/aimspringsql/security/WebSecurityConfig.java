package aimyamaguchi.co.jp.aimspringsql.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import aimyamaguchi.co.jp.aimspringsql.authfilters.JwtTokenFilterConfigurer;
import aimyamaguchi.co.jp.aimspringsql.authfilters.JwtTokenProvider;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.resource.PathResourceResolver;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import java.io.IOException;


@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Bean 
    @Override 
    public AuthenticationManager authenticationManagerBean() throws Exception { 
        return super.authenticationManagerBean(); 
    }

    @Bean
    public PasswordEncoder encoder(){
        return NoOpPasswordEncoder.getInstance();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
        .cors()
                .and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and().authorizeRequests()
                .antMatchers("POST", "/api/auth/**").permitAll()
                .antMatchers("*","/api/admin/**").authenticated()
                .antMatchers("*","/api/se/**").authenticated()
                .antMatchers("/**").permitAll()
        .and()
        .apply(new JwtTokenFilterConfigurer(jwtTokenProvider));
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
      web.ignoring()
      .antMatchers("GET", "/api/public/**")
      .antMatchers("/resources/**");
    }

}