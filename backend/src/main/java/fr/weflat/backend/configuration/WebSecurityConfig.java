package fr.weflat.backend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import fr.weflat.backend.security.JWTAuthenticationFilter;
import fr.weflat.backend.security.JWTLoginFilter;
import fr.weflat.backend.security.WeflatAuthenticationProvider;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired 
	private WeflatAuthenticationProvider weflatAuthenticationProvider;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
			.authorizeRequests()
			.antMatchers("/architecte/{architecteId:\\d+}/**").access("@weflatSecurityService.hasAccessToArchitecte(authentication,#architecteId)")
			.antMatchers("/acheteur/{acheteurId:\\d+}/**").access("@weflatSecurityService.hasAccessToAcheteur(authentication,#acheteurId)")
			.antMatchers("/visits/{visitId:\\d+}/**").access("@weflatSecurityService.hasAccessToVisit(authentication,#visitId)")
			.anyRequest().authenticated()
		.and()
			.logout()
			.logoutSuccessHandler(new WeflatLogoutSuccessHandler())
			.permitAll()
		.and()
			.addFilterBefore(new JWTLoginFilter("/login", authenticationManager()), UsernamePasswordAuthenticationFilter.class)
			// And filter other requests to check the presence of JWT in header
			.addFilterBefore(new JWTAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
		
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(weflatAuthenticationProvider);
	}
}
