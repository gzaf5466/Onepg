import sys
import time
import pexpect

def deploy(password):
    host = "200.97.174.138"
    user = "root"
    print(f"🚀 Connecting to {user}@{host}...")
    
    # SCP nginx_onepg.conf
    scp_cmd = f"scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null nginx_onepg.conf {user}@{host}:/etc/nginx/sites-available/default"
    child = pexpect.spawn(scp_cmd, timeout=30)
    
    index = child.expect(['[pP]assword:', pexpect.EOF, pexpect.TIMEOUT])
    if index == 0:
        child.sendline(password)
        child.expect(pexpect.EOF)
        print("✅ Uploaded nginx_onepg.conf to /etc/nginx/sites-available/default")
    else:
        print("❌ SCP failed:", child.before.decode('utf-8', errors='ignore'))
        return False

    # SSH & Reload Nginx + PM2
    ssh_cmd = f"ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null {user}@{host} 'nginx -t && systemctl restart nginx && pm2 restart all || true'"
    child = pexpect.spawn(ssh_cmd, timeout=30)
    
    index = child.expect(['[pP]assword:', pexpect.EOF, pexpect.TIMEOUT])
    if index == 0:
        child.sendline(password)
        child.expect(pexpect.EOF)
        output = child.before.decode('utf-8', errors='ignore')
        print("✅ Output from VPS:\n", output)
        print("🎉 Nginx restarted & PM2 restarted successfully!")
        return True
    else:
        print("❌ SSH execution failed:", child.before.decode('utf-8', errors='ignore'))
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 deploy_vps.py <VPS_PASSWORD>")
        sys.exit(1)
    deploy(sys.argv[1])
