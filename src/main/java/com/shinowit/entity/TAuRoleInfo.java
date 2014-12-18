package com.shinowit.entity;

import org.apache.struts2.json.annotations.JSON;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TAu_RoleInfo")
public class TAuRoleInfo {
    private int id;
    private String roleId;
    private String roleName;
    private Short sortId;
    private Boolean state;
    private Collection<TAuAuthorization> tAuAuthorizationsByRoleId;
    private Collection<TAuOperInfo> tAuOperInfosByRoleId;


    @Basic
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID",updatable = false,insertable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "RoleID")
    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    @Basic
    @Column(name = "RoleName")
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Basic
    @Column(name = "SortID")
    public Short getSortId() {
        return sortId;
    }

    public void setSortId(Short sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    @OneToMany(mappedBy = "TAuRoleInfoByRoleId")
    @JSON(serialize = false)
    public Collection<TAuAuthorization> getTAuAuthorizationsByRoleId() {
        return tAuAuthorizationsByRoleId;
    }

    public void setTAuAuthorizationsByRoleId(Collection<TAuAuthorization> tAuAuthorizationsByRoleId) {
        this.tAuAuthorizationsByRoleId = tAuAuthorizationsByRoleId;
    }

    @OneToMany(mappedBy = "TAuRoleInfoByRoleId")
    @JSON(serialize = false)
    public Collection<TAuOperInfo> getTAuOperInfosByRoleId() {
        return tAuOperInfosByRoleId;
    }

    public void setTAuOperInfosByRoleId(Collection<TAuOperInfo> tAuOperInfosByRoleId) {
        this.tAuOperInfosByRoleId = tAuOperInfosByRoleId;
    }
}
