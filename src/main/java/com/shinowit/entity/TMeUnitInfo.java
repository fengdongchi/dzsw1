package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TMe_UnitInfo")
public class TMeUnitInfo {
    private byte unitId;
    private String name;
    private Boolean status;
    private String remark;
    private Collection<TMeMerchandiseInfo> tMeMerchandiseInfosByUnitId;
    private Collection<TMeOrderDetailsInfo> tMeOrderDetailsInfosByUnitId;

    @Id
    @Column(name = "UnitID")
    public byte getUnitId() {
        return unitId;
    }

    public void setUnitId(byte unitId) {
        this.unitId = unitId;
    }

    @Basic
    @Column(name = "Name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "Status")
    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }



    @OneToMany(mappedBy = "TMeUnitInfoByUnitId",fetch = FetchType.LAZY)
    public Collection<TMeMerchandiseInfo> getTMeMerchandiseInfosByUnitId() {
        return tMeMerchandiseInfosByUnitId;
    }

    public void setTMeMerchandiseInfosByUnitId(Collection<TMeMerchandiseInfo> tMeMerchandiseInfosByUnitId) {
        this.tMeMerchandiseInfosByUnitId = tMeMerchandiseInfosByUnitId;
    }

    @OneToMany(mappedBy = "TMeUnitInfoByUnitId",fetch = FetchType.LAZY)
    public Collection<TMeOrderDetailsInfo> getTMeOrderDetailsInfosByUnitId() {
        return tMeOrderDetailsInfosByUnitId;
    }

    public void setTMeOrderDetailsInfosByUnitId(Collection<TMeOrderDetailsInfo> tMeOrderDetailsInfosByUnitId) {
        this.tMeOrderDetailsInfosByUnitId = tMeOrderDetailsInfosByUnitId;
    }
}
