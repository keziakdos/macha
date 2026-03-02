# Guide Étendu : Déploiement de Macha sur VPS Hostinger

Ce guide vous accompagne pas à pas pour mettre en ligne votre site sur **macha.rwazap.com**.

## Étape 1 : Préparation des fichiers sur votre ordinateur (Windows)

1.  Ouvrez le menu Démarrer et tapez **CMD** (ou PowerShell) et lancez-le.
2.  Copiez et collez la commande suivante pour vous rendre dans le dossier du projet :
    ```powershell
    cd "C:\Users\KeziaK\Documents\webmaster\macha"
    ```
3.  Lancez la compilation du site pour la production :
    ```powershell
    npm run build
    ```
    > [!NOTE]
    > Une fois terminé, un nouveau dossier nommé `dist` aura été créé dans `C:\Users\KeziaK\Documents\webmaster\macha\dist`. C'est ce dossier qui contient votre site final.

## Étape 2 : Connexion au VPS Hostinger

1.  Dans votre terminal, connectez-vous à votre serveur (utilisez l'IP fournie par Hostinger) :
    ```bash
    ssh root@VOTRE_IP_SERVEUR
    ```
2.  Créez le dossier de destination sur le serveur :
    ```bash
    mkdir -p /var/www/html/macha
    ```

## Étape 3 : Transfert des fichiers du PC vers le VPS

Vous allez envoyer le contenu du dossier `dist` de votre PC vers le serveur.
**Lancez cette commande depuis un NOUVEAU terminal sur votre PC (pas celui où vous êtes connecté en SSH) :**

```powershell
scp -r "C:\Users\KeziaK\Documents\webmaster\macha\dist\*" root@VOTRE_IP_SERVEUR:/var/www/html/macha
```

## Étape 4 : Configuration du serveur Nginx

1.  Sur votre terminal (celui connecté en SSH), créez le fichier de configuration :
    ```bash
    nano /etc/nginx/sites-available/macha
    ```
2.  Copiez et collez ce bloc de configuration complet :
    ```nginx
    server {
        listen 80;
        server_name macha.rwazap.com;

        root /var/www/html/macha;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Optimisation pour les images
        location ~* \.(png|jpg|jpeg|gif|svg|ico)$ {
            expires 30d;
            add_header Cache-Control "public, no-transform";
        }
    }
    ```
3.  Enregistrez (Touches `CTRL+O`, puis `Entrée`) et quittez (`CTRL+X`).

## Étape 5 : Activation du site

Lancez ces trois commandes l'une après l'autre :
```bash
ln -s /etc/nginx/sites-available/macha /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## Étape 6 : Sécurisation HTTPS (SSL)

Pour que votre site soit en `https://`, installez Certbot :
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d macha.rwazap.com
```
Suivez les instructions à l'écran (choisissez "Redirect" pour forcer le HTTPS).

---
Votre site est maintenant disponible sur **https://macha.rwazap.com** !
