import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import API_BASE_URL from '../config';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  balance: number;
  totalDeposited: number;
  totalWithdrawn: number;
  status: string;
  createdAt: string;
  referrals: any[];
}

interface Transaction {
  _id: string;
  userId: User | { firstName: string; lastName: string; email: string };
  type: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
  planType?: string;
  walletAddress?: string;
}

type AdminTab = 'dashboard' | 'users' | 'transfers' | 'settings';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passCurrent, setPassCurrent] = useState('');
  const [passNew, setPassNew] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passError, setPassError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    checkAdminAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const checkAdminAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/admin/check`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        navigate('/');
      }
    } catch (error) {
      navigate('/');
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [usersRes, transRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/users`, { headers }),
        fetch(`${API_BASE_URL}/admin/transactions`, { headers })
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);
      }
      if (transRes.ok) {
        const transData = await transRes.json();
        setTransactions(transData.transactions || []);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, type: 'deposit' | 'withdrawal', status: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/admin/${type}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin_authenticated');
    navigate('/admin');
  };

  const getDashboardStats = () => {
    const totalUsers = users.length;
    const totalDeposits = transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawals = transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0);
    const pendingTransactions = transactions.filter(t => t.status === 'pending').length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    return { totalUsers, totalDeposits, totalWithdrawals, pendingTransactions, activeUsers };
  };

  const chartData = [
    { month: 'Jan', deposits: 45000, withdrawals: 12000, users: 120 },
    { month: 'Feb', deposits: 52000, withdrawals: 15000, users: 145 },
    { month: 'Mar', deposits: 61000, withdrawals: 18000, users: 178 },
    { month: 'Apr', deposits: 58000, withdrawals: 16000, users: 195 },
    { month: 'May', deposits: 72000, withdrawals: 22000, users: 220 },
    { month: 'Jun', deposits: 85000, withdrawals: 25000, users: 260 },
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading admin panel...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const stats = getDashboardStats();

  const sidebarTabs: { key: AdminTab; label: string; icon: string }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
    { key: 'users', label: 'Users', icon: 'fa-users' },
    { key: 'transfers', label: 'Transfers', icon: 'fa-arrow-right-arrow-left' },
    { key: 'settings', label: 'Settings', icon: 'fa-gear' },
  ];

  const renderDashboard = () => (
    <>
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="stat-header">
            <span className="stat-label">Total Users</span>
            <i className="fas fa-users" style={{color:'var(--accent-primary)'}}></i>
          </div>
          <div className="stat-value">{stats.totalUsers}</div>
          <div className="stat-trend up"><i className="fas fa-arrow-up"></i> {stats.activeUsers} active</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-header">
            <span className="stat-label">Total Deposits</span>
            <i className="fas fa-circle-dollar" style={{color:'var(--accent-secondary)'}}></i>
          </div>
          <div className="stat-value">${stats.totalDeposits.toLocaleString()}</div>
          <div className="stat-trend up"><i className="fas fa-arrow-up"></i> +23%</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-header">
            <span className="stat-label">Total Withdrawals</span>
            <i className="fas fa-paper-plane" style={{color:'var(--accent-warning)'}}></i>
          </div>
          <div className="stat-value">${stats.totalWithdrawals.toLocaleString()}</div>
          <div className="stat-trend warn"><i className="fas fa-minus"></i> Stable</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-header">
            <span className="stat-label">Pending</span>
            <i className="fas fa-clock" style={{color:'var(--accent-danger)'}}></i>
          </div>
          <div className="stat-value">{stats.pendingTransactions}</div>
          <div className="stat-trend warn"><i className="fas fa-exclamation-triangle"></i> Requires action</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" />
              <YAxis stroke="var(--text-tertiary)" />
              <Tooltip contentStyle={{background:'var(--bg-card)',border:'1px solid var(--border-primary)',borderRadius:'8px',color:'var(--text-primary)'}} />
              <Area type="monotone" dataKey="deposits" stroke="var(--accent-primary)" fill="url(#colorDeposits)" strokeWidth={2} />
              <Area type="monotone" dataKey="withdrawals" stroke="var(--accent-danger)" fill="none" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" />
              <YAxis stroke="var(--text-tertiary)" />
              <Tooltip contentStyle={{background:'var(--bg-card)',border:'1px solid var(--border-primary)',borderRadius:'8px',color:'var(--text-primary)'}} />
              <Bar dataKey="users" fill="var(--accent-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="admin-section-header" style={{marginTop:'8px'}}>
        <h2>Recent Transactions</h2>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 10).map((tx: any) => (
              <tr key={tx._id}>
                <td style={{fontWeight:600}}>{tx.userId?.firstName} {tx.userId?.lastName}</td>
                <td><span className={`tx-status ${tx.type === 'deposit' ? 'completed' : 'pending'}`}>{tx.type}</span></td>
                <td style={{fontWeight:600}}>${tx.amount?.toLocaleString()}</td>
                <td style={{color:'var(--text-tertiary)'}}>{tx.method || '-'}</td>
                <td><span className={`tx-status ${tx.status}`}>{tx.status}</span></td>
                <td style={{color:'var(--text-tertiary)'}}>{new Date(tx.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderUsers = () => (
    <>
      <div className="admin-section-header">
        <h2>Manage Users</h2>
        <span className="admin-count">{users.length} total users</span>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Deposits</th>
              <th>Referrals</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td style={{fontWeight:600}}>{user.firstName} {user.lastName}</td>
                <td style={{color:'var(--text-tertiary)'}}>{user.email}</td>
                <td style={{fontWeight:600}}>${user.balance?.toLocaleString()}</td>
                <td style={{fontWeight:600}}>${user.totalDeposited?.toLocaleString() || '0'}</td>
                <td>{user.referrals?.length || 0}</td>
                <td><span className={`tx-status ${user.status === 'active' ? 'active' : 'suspended'}`}>{user.status}</span></td>
                <td style={{color:'var(--text-tertiary)'}}>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    className={`admin-action-btn ${user.status === 'active' ? 'reject' : 'approve'}`}
                    onClick={() => toggleUserStatus(user._id, user.status)}
                  >
                    {user.status === 'active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderTransfers = () => (
    <>
      <div className="admin-section-header">
        <h2>All Transactions</h2>
        <span className="admin-count">{transactions.length} total</span>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx: any) => (
              <tr key={tx._id}>
                <td style={{fontWeight:600}}>{tx.userId?.firstName} {tx.userId?.lastName}</td>
                <td><span className={`tx-status ${tx.type === 'deposit' ? 'completed' : 'pending'}`}>{tx.type}</span></td>
                <td style={{fontWeight:600}}>${tx.amount?.toLocaleString()}</td>
                <td style={{color:'var(--text-tertiary)'}}>{tx.method || '-'}</td>
                <td style={{color:'var(--text-tertiary)'}}>{tx.planType || '-'}</td>
                <td><span className={`tx-status ${tx.status}`}>{tx.status}</span></td>
                <td style={{color:'var(--text-tertiary)'}}>{new Date(tx.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMsg('');
    setPassError('');
    if (passNew !== passConfirm) { setPassError('New passwords do not match'); return; }
    if (passNew.length < 6) { setPassError('Password must be at least 6 characters'); return; }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/admin/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: passCurrent, newPassword: passNew })
      });
      const data = await res.json();
      if (res.ok) {
        setPassMsg('Password changed successfully!');
        setPassCurrent(''); setPassNew(''); setPassConfirm('');
      } else {
        setPassError(data.message || 'Failed to change password');
      }
    } catch (err) { setPassError('Connection error'); }
  };

  const renderSettings = () => (
    <div style={{maxWidth:'500px'}}>
      <h2 style={{fontSize:'1.3rem',fontWeight:700,marginBottom:'24px'}}>Change Admin Password</h2>
      {passMsg && <div className="alert alert-success">{passMsg}</div>}
      {passError && <div className="alert alert-error">{passError}</div>}
      <form onSubmit={handlePasswordChange}>
        <div className="form-group">
          <label className="form-label">Current Password</label>
          <input type="password" className="form-input" value={passCurrent} onChange={e => setPassCurrent(e.target.value)} placeholder="Enter current password" />
        </div>
        <div className="form-group">
          <label className="form-label">New Password</label>
          <input type="password" className="form-input" value={passNew} onChange={e => setPassNew(e.target.value)} placeholder="Enter new password (min 6 characters)" />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm New Password</label>
          <input type="password" className="form-input" value={passConfirm} onChange={e => setPassConfirm(e.target.value)} placeholder="Confirm new password" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!passCurrent || !passNew || !passConfirm}>
          <i className="fas fa-save"></i> Update Password
        </button>
      </form>
    </div>
  );

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo"><i className="fas fa-chart-line"></i></div>
          <div>
            <div className="admin-sidebar-title">NORNS</div>
            <div className="admin-sidebar-badge">Admin</div>
          </div>
        </div>
        <nav style={{flex:1}}>
          {sidebarTabs.map(tab => (
            <button key={tab.key} className={`admin-nav-item ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
              <i className={`fas ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <button className="admin-nav-item" onClick={handleLogout} style={{marginTop:'auto',color:'var(--accent-danger)'}}>
          <i className="fas fa-sign-out-alt"></i><span>Logout</span>
        </button>
      </aside>

      <div className="admin-main-content">
        <header className="admin-header">
          <h2 className="admin-header-title">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          <div className="admin-header-right"><div className="admin-avatar">A</div></div>
        </header>
        <div className="admin-content">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'transfers' && renderTransfers()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
};

export default Admin;