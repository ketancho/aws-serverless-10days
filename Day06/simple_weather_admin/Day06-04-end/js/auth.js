// 認証サービスクラス
class AuthService {
  constructor() {
    this.cognitoUser = null;
    this.userPool = null;
    this.initializeUserPool();
  }

  // User Pool初期化
  initializeUserPool() {
    this.userPool = new AmazonCognitoIdentity.CognitoUserPool({
      UserPoolId: CONFIG.COGNITO.USER_POOL_ID,
      ClientId: CONFIG.COGNITO.CLIENT_ID
    });
  }

  // サインアップ
  signUp(email, password) {
    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, [], null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // 確認コード送信
  confirmSignUp(email, code) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: email,
        Pool: this.userPool
      });

      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  // サインイン
  signIn(email, password) {
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password
      });

      const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: email,
        Pool: this.userPool
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.cognitoUser = cognitoUser;
          // JWTトークンをローカルストレージに保存
          localStorage.setItem('accessToken', result.getAccessToken().getJwtToken());
          localStorage.setItem('idToken', result.getIdToken().getJwtToken());
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        }
      });
    });
  }

  // ログアウト
  signOut() {
    const currentUser = this.userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    this.cognitoUser = null;
  }

  // 認証状態確認
  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    return token !== null;
  }

  // アクセストークン取得
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }
}

window.authService = new AuthService();