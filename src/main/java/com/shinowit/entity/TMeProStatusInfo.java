package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TMe_ProStatusInfo")
public class TMeProStatusInfo {
    private byte proStatusId;
    private String proStatusName;
    private Boolean status;
    private String remark;
    private Collection<TMeMerchandiseInfo> tMeMerchandiseInfosByProStatusId;

    @Id
    @Column(name = "ProStatusID")
    public byte getProStatusId() {
        return proStatusId;
    }

    public void setProStatusId(byte proStatusId) {
        this.proStatusId = proStatusId;
    }

    @Basic
    @Column(name = "ProStatusName")
    public String getProStatusName() {
        return proStatusName;
    }

    public void setProStatusName(String proStatusName) {
        this.proStatusName = proStatusName;
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



    @OneToMany(mappedBy = "TMeProStatusInfoByProStatusId",fetch = FetchType.LAZY)
    public Collection<TMeMerchandiseInfo> getTMeMerchandiseInfosByProStatusId() {
        return tMeMerchandiseInfosByProStatusId;
    }

    public void setTMeMerchandiseInfosByProStatusId(Collection<TMeMerchandiseInfo> tMeMerchandiseInfosByProStatusId) {
        this.tMeMerchandiseInfosByProStatusId = tMeMerchandiseInfosByProStatusId;
    }
}
