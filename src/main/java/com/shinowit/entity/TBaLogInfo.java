package com.shinowit.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TBa_LogInfo")
public class TBaLogInfo {
    private int id;
    private Timestamp logTime;
    private String ip;
    private String content;
    private TAuMenuInfo tAuMenuInfoByMenuId;
    private TAuOperInfo tAuOperInfoByOperId;

    @Id
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "LogTime")
    public Timestamp getLogTime() {
        return logTime;
    }

    public void setLogTime(Timestamp logTime) {
        this.logTime = logTime;
    }

    @Basic
    @Column(name = "IP")
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Basic
    @Column(name = "Content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID")
    public TAuMenuInfo getTAuMenuInfoByMenuId() {
        return tAuMenuInfoByMenuId;
    }

    public void setTAuMenuInfoByMenuId(TAuMenuInfo tAuMenuInfoByMenuId) {
        this.tAuMenuInfoByMenuId = tAuMenuInfoByMenuId;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfo getTAuOperInfoByOperId() {
        return tAuOperInfoByOperId;
    }

    public void setTAuOperInfoByOperId(TAuOperInfo tAuOperInfoByOperId) {
        this.tAuOperInfoByOperId = tAuOperInfoByOperId;
    }

}
