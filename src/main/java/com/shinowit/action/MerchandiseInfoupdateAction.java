package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfo;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class MerchandiseInfoupdateAction extends ActionSupport{
    private boolean success;
    private String message;
    private List<TMeMerchandiseInfo> chanlist;
    private TMeMerchandiseInfo chan;
    @Resource
    private BaseDAO<TMeMerchandiseInfo> dao;

    public String update(){
        chanlist=dao.myfindByHql("from TMeMerchandiseInfo where merchandiseName=?", chan.getMerchandiseName());
        if(chanlist.size()>0){
            setMessage("更新失败，请重新更改");
            setSuccess(false);
            return SUCCESS;
        }
        dao.update(chan);
        setMessage("更新成功！");
        setSuccess(true);
        return SUCCESS;
    }

    public List<TMeMerchandiseInfo> getChanlist() {
        return chanlist;
    }

    public void setChanlist(List<TMeMerchandiseInfo> chanlist) {
        this.chanlist = chanlist;
    }

    public TMeMerchandiseInfo getChan() {
        return chan;
    }

    public void setChan(TMeMerchandiseInfo chan) {
        this.chan = chan;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

}
