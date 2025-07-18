﻿using aps_fd_explorer.Models;

namespace aps_fd_explorer;

public class Startup
{
	public Startup(IConfiguration configuration)
	{
		Configuration = configuration;
	}

	public IConfiguration Configuration { get; }

	// This method gets called by the runtime. Use this method to add services to the container.
	public void ConfigureServices(IServiceCollection services)
	{
		services.AddControllers();
		var apsClientID = Configuration["APS_CLIENT_ID"];
		var apsClientSecret = Configuration["APS_CLIENT_SECRET"];
		var apsCallbackURL = Configuration["APS_CALLBACK_URL"];
		if (string.IsNullOrEmpty(apsClientID) || string.IsNullOrEmpty(apsClientSecret) || string.IsNullOrEmpty(apsCallbackURL))
		{
			throw new ApplicationException("Missing required environment variables APS_CLIENT_ID, APS_CLIENT_SECRET, or APS_CALLBACK_URL.");
		}
		services.AddSingleton<APSService>(new APSService(apsClientID, apsClientSecret, apsCallbackURL));
	}

	// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
	public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
	{
		if (env.IsDevelopment())
		{
			app.UseDeveloperExceptionPage();
		}
		app.UseDefaultFiles();
		app.UseStaticFiles();
		app.UseRouting();
		app.UseEndpoints(endpoints =>
		{
			endpoints.MapControllers();
		});
	}
}