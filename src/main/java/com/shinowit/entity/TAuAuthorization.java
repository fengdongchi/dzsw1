package com.shinowit.entity;

import org.apache.struts2.json.annotations.JSON;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/12/2.
 */
@Entity
@Table(name = "TAu_Authorization")
public class TAuAuthorization {
    private int id;
    private Boolean isEnabled;
    private TAuMenuInfo tAuMenuInfoByMenuId;
    private TAuRoleInfo tAuRoleInfoByRoleId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "IsEnabled")
    public Boolean getIsEnabled() {
        return isEnabled;
    }

    public void setIsEnabled(Boolean isEnabled) {
        this.isEnabled = isEnabled;
    }

    @ManyToOne
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID")
    public TAuMenuInfo getTAuMenuInfoByMenuId() {
        return tAuMenuInfoByMenuId;
    }

    public void setTAuMenuInfoByMenuId(TAuMenuInfo tAuMenuInfoByMenuId) {
        this.tAuMenuInfoByMenuId = tAuMenuInfoByMenuId;
    }

    @ManyToOne
    @JoinColumn(name = "RoleId",referencedColumnName = "RoleId")
    @JSON(serialize = false)
    public TAuRoleInfo getTAuRoleInfoByRoleId() {
        return tAuRoleInfoByRoleId;
    }

    public void setTAuRoleInfoByRoleId(TAuRoleInfo tAuRoleInfoByRoleId) {
        this.tAuRoleInfoByRoleId = tAuRoleInfoByRoleId;
    }
}
