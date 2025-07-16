using Autodesk.Authentication.Model;
using Autodesk.SDKManager;

namespace aps_fd_explorer.Models;

public class Tokens
{
	public string AccessToken;
	public string RefreshToken;
	public DateTime ExpiresAt;
}

public partial class APSService
{
	private readonly SDKManager _sdkManager;
	private readonly string _clientId;
	private readonly string _clientSecret;
	private readonly string _callbackUri;
	private readonly List<Scopes> TokenScopes = new List<Scopes> { Scopes.DataRead, Scopes.ViewablesRead };

	public APSService(string clientId, string clientSecret, string callbackUri)
	{
		_sdkManager = SdkManagerBuilder.Create().Build();
		_clientId = clientId;
		_clientSecret = clientSecret;
		_callbackUri = callbackUri;
	}
}